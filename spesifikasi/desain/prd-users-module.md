# PRD — Modul Users & Manajemen Akun
## LearnHub LMS · v1.0

---

## 1. Overview

Dokumen ini mendefinisikan spesifikasi lengkap modul **Users & Manajemen Akun** untuk platform LearnHub LMS. Modul ini menjadi fondasi seluruh sistem — autentikasi, otorisasi, dan pengelolaan profil semua aktor platform.

**Status:** Ready for development
**Prioritas:** P0 — Harus selesai sebelum modul lain
**Estimasi:** 5–7 hari kerja

---

## 2. Tujuan & Ruang Lingkup

### Tujuan
- Menyediakan satu sumber kebenaran (single source of truth) untuk semua pengguna platform
- Mengimplementasikan sistem role-permission yang fleksibel via Spatie Laravel Permission
- Menjamin keamanan akses berbasis role dengan granularitas permission level
- Menyediakan profil yang kaya dan spesifik per role tanpa mencemari tabel utama

### Yang Termasuk
- Tabel users + ULID primary key
- Tabel profil spesifik role (instructor_profiles, student_profiles)
- Integrasi Spatie Permission (roles + permissions)
- Auth flow: login, register, forgot password, email verifikasi
- Admin panel: CRUD pengguna, assign role, kelola status
- UI halaman: daftar pengguna, detail, edit profil, profil saya

### Yang Tidak Termasuk
- Enrollment ke kursus (modul Courses)
- Sistem pembayaran instructor (modul Payments)
- Sertifikat (modul Certificates)

---

## 3. Aktor & Role

### Hierarki Role

```
dev
 └── admin
      ├── instructor
      └── student
```

| Role | Deskripsi | Akses Panel Admin |
|------|-----------|:-----------------:|
| dev | Developer sistem, akses penuh tak terbatas termasuk debug tools, log, dan konfigurasi low-level | Full |
| admin | Administrator platform, kelola konten, pengguna, dan transaksi | Full (kecuali dev tools) |
| instructor | Pengajar/instruktur, membuat dan mengelola kursus miliknya | Terbatas |
| student | Pelajar, mengikuti kursus dan mendapatkan sertifikat | Frontend only |

### Catatan Penting
- Satu user bisa memiliki lebih dari satu role (contoh: instructor yang juga student di kursus lain)
- Role assignment dilakukan oleh admin atau dev
- Student yang mengajukan menjadi instructor cukup ditambahkan role instructor tanpa pindah tabel

---

## 4. Skema Database

### 4.1 Tabel users

```sql
CREATE TABLE users (
    id                 CHAR(26) PRIMARY KEY,
    name               VARCHAR(150) NOT NULL,
    email              VARCHAR(255) NOT NULL UNIQUE,
    password           VARCHAR(255) NOT NULL,
    phone              VARCHAR(20)  NULL,
    bio                TEXT         NULL,
    status             ENUM('active','inactive','banned','suspended')
                       NOT NULL DEFAULT 'active',
    email_verified_at  TIMESTAMP NULL,
    last_login_at      TIMESTAMP NULL,
    last_login_ip      VARCHAR(45) NULL,
    remember_token     VARCHAR(100) NULL,
    created_at         TIMESTAMP NULL,
    updated_at         TIMESTAMP NULL,
    deleted_at         TIMESTAMP NULL
);
```

Catatan kolom:
- id — ULID 26 karakter, lexicographically sortable by time
- avatar — dikelola via **Spatie Media Library** (collection `'avatar'`, single file; fallback otomatis jika null via DiceBear / ui-avatars)
- status — banned = permanen diblokir, suspended = sementara dinonaktifkan
- last_login_ip — dicatat setiap login berhasil untuk audit trail
- Soft delete agar histori transaksi/enrollment tidak orphan

---

### 4.2 Tabel instructor_profiles

Data tambahan khusus instruktur. Dibuat saat user di-assign role instructor.

```sql
CREATE TABLE instructor_profiles (
    id                  CHAR(26) PRIMARY KEY,
    user_id             CHAR(26) NOT NULL UNIQUE,
    headline            VARCHAR(150) NULL,
    expertise           VARCHAR(255) NULL,
    website_url         VARCHAR(500) NULL,
    linkedin_url        VARCHAR(500) NULL,
    youtube_url         VARCHAR(500) NULL,
    bank_name           VARCHAR(100) NULL,
    bank_account_number VARCHAR(50)  NULL,
    bank_account_name   VARCHAR(150) NULL,
    revenue_share       TINYINT UNSIGNED NOT NULL DEFAULT 70,
    rating              DECIMAL(3,2)     NOT NULL DEFAULT 0.00,
    total_students      INT UNSIGNED     NOT NULL DEFAULT 0,
    total_courses       INT UNSIGNED     NOT NULL DEFAULT 0,
    total_revenue       DECIMAL(15,2)    NOT NULL DEFAULT 0.00,
    is_verified         BOOLEAN          NOT NULL DEFAULT FALSE,
    verified_at         TIMESTAMP NULL,
    verified_by         CHAR(26)  NULL,
    created_at          TIMESTAMP NULL,
    updated_at          TIMESTAMP NULL,

    FOREIGN KEY (user_id)     REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

### 4.3 Tabel student_profiles

Data tambahan khusus student. Dibuat otomatis saat register.

```sql
CREATE TABLE student_profiles (
    id                      CHAR(26) PRIMARY KEY,
    user_id                 CHAR(26) NOT NULL UNIQUE,
    education_level         ENUM('sd','smp','sma','d3','s1','s2','s3','other') NULL,
    occupation              VARCHAR(150) NULL,
    learning_goals          TEXT         NULL,
    total_courses_enrolled  INT UNSIGNED NOT NULL DEFAULT 0,
    total_courses_completed INT UNSIGNED NOT NULL DEFAULT 0,
    total_certificates      INT UNSIGNED NOT NULL DEFAULT 0,
    total_spent             DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    created_at              TIMESTAMP NULL,
    updated_at              TIMESTAMP NULL,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

### 4.4 Tabel Spatie Permission (auto-generated)

```
roles                → id, name, guard_name, timestamps
permissions          → id, name, guard_name, timestamps
role_has_permissions → permission_id, role_id
model_has_roles      → role_id, model_type, model_id
model_has_permissions → permission_id, model_type, model_id
```

Karena pakai ULID, kolom model_id di tabel pivot Spatie perlu diubah dari
integer ke CHAR(26). Lihat bagian 14 untuk detail konfigurasi.

---

## 5. Daftar Roles & Permissions

### Roles

```
dev | admin | instructor | student
```

### Permissions (grouped by module)

```
# Users
users.view          users.create        users.edit
users.delete        users.restore       users.assign-role
users.ban           users.force-delete

# Courses
courses.view        courses.create      courses.edit
courses.delete      courses.publish     courses.approve

# Orders & Payments
orders.view         orders.refund       payments.view
payments.export     coupons.manage

# Blog & Content
blog.view           blog.create         blog.edit
blog.delete         blog.publish        comments.moderate

# Media
media.view          media.upload        media.delete

# Settings & System
settings.view       settings.edit       settings.danger
activity-log.view   roles.manage        dev.tools
```

### Mapping Role ke Permission (default seeder)

| Permission          | dev | admin | instructor | student |
|---------------------|:---:|:-----:|:----------:|:-------:|
| users.*             |  v  |   v   |            |         |
| users.assign-role   |  v  |   v   |            |         |
| courses.view        |  v  |   v   |     v      |         |
| courses.create/edit |  v  |   v   |  v (milik) |         |
| courses.publish     |  v  |   v   |            |         |
| courses.approve     |  v  |   v   |            |         |
| orders.*            |  v  |   v   |            |         |
| blog.*              |  v  |   v   |  v (milik) |         |
| comments.moderate   |  v  |   v   |  v (kursus)|         |
| media.*             |  v  |   v   |     v      |         |
| settings.*          |  v  |   v   |            |         |
| settings.danger     |  v  |       |            |         |
| dev.tools           |  v  |       |            |         |
| roles.manage        |  v  |       |            |         |
| activity-log.view   |  v  |   v   |            |         |

---

## 6. Auth Flow

### 6.1 Register Student

```
1. User isi form: name, email, password, confirm_password
2. Validasi server-side
3. Buat record users (status: inactive)
4. Assign role student
5. Buat record student_profiles (kosong/default)
6. Kirim email verifikasi
7. Redirect ke halaman "Cek email Anda" (verify-email.html)
8. Setelah klik link → status jadi active, redirect dashboard
```

### 6.2 Daftar sebagai Instructor

```
1. Student login → Settings → "Daftar sebagai Instruktur"
2. Isi form pengajuan (headline, expertise, motivasi)
3. Admin mereview pengajuan di panel
4. Jika disetujui:
   a. Assign role instructor ke user
   b. Buat record instructor_profiles
   c. Kirim email notifikasi persetujuan
5. Jika ditolak: kirim email dengan alasan
```

### 6.3 Login

```
1. Input email + password
2. Cek rate limit (max 5 attempt/menit per IP)
3. Cek status user:
   - inactive  → "Akun belum diaktifkan. Cek email Anda."
   - banned    → "Akun Anda telah diblokir. Hubungi admin."
   - suspended → "Akun dinonaktifkan sementara."
4. Jika active: buat session, catat last_login_at + last_login_ip
5. Redirect berdasarkan role:
   - dev / admin / instructor → /admin/dashboard
   - student                 → /dashboard (frontend)
```

### 6.4 Forgot Password

```
1. Input email → kirim link reset (berlaku 60 menit)
2. Klik link → form password baru
3. Password diperbarui → redirect login + toast sukses
```

---

## 7. Spesifikasi UI Admin Panel

Desain mengacu pada halaman HTML yang sudah dibuat.
Stack: Bootstrap 5.3.3, Bootstrap Icons 1.11.3, Poppins, CSS variables LearnHub.
Layout shell: sidebar 260px / 72px collapsed, topbar 64px.

### 7.1 Halaman Daftar Pengguna — /admin/users

Referensi: users.html

Komponen halaman:

Stat cards (4):
- Total Pengguna (biru, bi-people-fill)
- Aktif (hijau, bi-person-check-fill)
- Instruktur (ungu, bi-easel-fill)
- Tersuspensi/Banned (merah, bi-person-x-fill)

Filter bar:
- Dropdown Role: All / Dev / Admin / Instructor / Student
- Dropdown Status: All / Active / Inactive / Banned / Suspended
- Input search nama/email (realtime atau on-enter)
- Chip per filter aktif dengan tombol x per chip
- Tombol Reset (merah, disabled saat tidak ada filter, shake jika diklik saat kosong)

Tabel kolom:
- # (nomor urut)
- Pengguna (avatar bulat + nama bold + email muted — 2 baris)
- Role (badge pill: dev=ungu, admin=biru, instructor=teal, student=abu)
- Status (badge: Active=hijau, Inactive=abu, Banned=merah, Suspended=kuning)
- Bergabung (tanggal + "3 hari lalu" di bawahnya)
- Login Terakhir (tanggal atau "Belum pernah")
- Aksi (dropdown: Lihat, Edit, Ban/Unban, Hapus)

Bulk actions: checkbox per baris, bulk ban / bulk delete / bulk assign role.
Pagination: 15/halaman, info "Menampilkan 1–15 dari 284 pengguna".

---

### 7.2 Halaman Detail Pengguna — /admin/users/{id}

Referensi: profile.html (layout yang sama, data dari user lain bukan diri sendiri)

Layout 2 kolom:
- Kiri (sticky, 300px): kartu profil
- Kanan: area tab konten

Kartu kiri:
- Cover banner gradient warna per role
- Avatar besar dengan fallback inisial
- Nama, role badge, email, telepon, tanggal join
- Bio
- Stats mini 2x2 (sesuai role: kursus/transaksi/sertifikat)
- Daftar permission aktif (efektif dari semua role)

Tab kanan:
1. Informasi — edit nama, email, phone, status, bio
2. Profil Role — form instructor_profile atau student_profile
3. Role & Permission — assign/revoke role, tambah permission langsung ke user
4. Aktivitas — log spatie/activitylog 30 entri terbaru (timeline)
5. Sesi — perangkat aktif + tombol revoke
6. Danger Zone — suspend, ban, hapus akun

---

### 7.3 Buat Pengguna — /admin/users/create

Form di modal (untuk single user) atau halaman terpisah (untuk batch/import):

```
Nama Lengkap      *
Email             *
Password          *   (dengan toggle show/hide + generate otomatis)
Konfirmasi Pw     *
Role              *   (multi-select dropdown)
Status                (default: active)
Kirim email welcome   (toggle, default: on)
```

Setelah submit: redirect ke halaman detail user baru + toast sukses.

---

### 7.4 Profil Saya — /admin/profile

Referensi: profile.html (sudah lengkap)

Tab 1 — Informasi Profil:
- Upload foto (JPG/PNG/WEBP max 2MB)
- Form: nama depan, nama belakang, username, email, telepon
- Bio textarea dengan counter karakter real-time (max 280)
- Preferensi: zona waktu, bahasa, format tanggal
- Toggle: dark mode, sidebar kompak saat login

Tab 2 — Aktivitas Terbaru:
- Timeline 8–30 item dengan ikon dan warna per tipe aksi
- Garis vertikal penghubung antar item

Tab 3 — Keamanan Akun:
- 2FA status + konfigurasi (Google Authenticator)
- Ganti password dengan strength meter (4 level)
- Sesi login aktif (nama device, lokasi, IP, tombol revoke)
- Danger zone: nonaktifkan / hapus akun

Tab 4 — Notifikasi:
- Toggle email per kategori (transaksi, komentar, laporan, instruktur baru, keamanan)
- Toggle in-app (push, suara, badge)

Sticky action bar di bawah:
- Dot oranye berkedip saat ada perubahan belum disimpan
- Tombol Batalkan + Simpan Profil (dengan loading spinner)

---

## 8. Spesifikasi API (Internal / Sanctum)

### Endpoint Users

```
GET    /api/admin/users              list + filter + paginate
POST   /api/admin/users              create user
GET    /api/admin/users/{id}         detail
PUT    /api/admin/users/{id}         update
DELETE /api/admin/users/{id}         soft delete
POST   /api/admin/users/{id}/restore restore
DELETE /api/admin/users/{id}/force   force delete permanen

POST   /api/admin/users/{id}/ban     ban  { reason }
POST   /api/admin/users/{id}/unban   unban
POST   /api/admin/users/{id}/suspend suspend  { reason, until? }
POST   /api/admin/users/{id}/activate aktifkan kembali

POST   /api/admin/users/{id}/roles   assign  { roles: [] }
DELETE /api/admin/users/{id}/roles   revoke  { roles: [] }
GET    /api/admin/users/{id}/permissions  efektif permissions
```

### Endpoint Profile (user sendiri)

```
GET    /api/profile                  profil yang sedang login
PUT    /api/profile                  update profil
POST   /api/profile/avatar           upload avatar (multipart)
DELETE /api/profile/avatar           hapus avatar (kembali DiceBear)
PUT    /api/profile/password         ganti password
GET    /api/profile/sessions         sesi aktif
DELETE /api/profile/sessions/{id}    revoke satu sesi
DELETE /api/profile/sessions         revoke semua kecuali saat ini
```

---

## 9. Validasi

### Create / Update User

```php
'name'     => ['required', 'string', 'max:150'],
'email'    => ['required', 'email', 'max:255', Rule::unique('users')->ignore($id)],
'password' => ['required', 'min:8', 'confirmed',
               'regex:/[A-Z]/',
               'regex:/[0-9]/'],
'phone'    => ['nullable', 'string', 'max:20'],
'bio'      => ['nullable', 'string', 'max:280'],
'status'   => ['required', 'in:active,inactive,banned,suspended'],
'avatar'   => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
```

### Assign Role

```php
'roles'   => ['required', 'array', 'min:1'],
'roles.*' => ['string', 'exists:roles,name'],
```

---

## 10. Model & Relasi

```php
class User extends Authenticatable
{
    use HasUlids;
    use HasRoles;          // Spatie Permission
    use HasFactory;
    use SoftDeletes;
    use Notifiable;

    // Relasi
    public function instructorProfile(): HasOne
    public function studentProfile(): HasOne
    public function activities(): MorphMany    // spatie/activitylog
    public function enrollments(): HasMany
    public function orders(): HasMany
    public function certificates(): HasMany

    // Helper methods
    public function isAdmin(): bool      { return $this->hasRole(['admin','dev']); }
    public function isInstructor(): bool { return $this->hasRole('instructor'); }
    public function isStudent(): bool    { return $this->hasRole('student'); }
    public function isBanned(): bool     { return $this->status === 'banned'; }
    public function isSuspended(): bool  { return $this->status === 'suspended'; }

    // Avatar URL dengan DiceBear fallback
    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) return Storage::url($this->avatar);
        $seed = urlencode($this->name);
        return "https://api.dicebear.com/7.x/initials/svg?seed={$seed}";
    }
}
```

---

## 11. Service Layer

```
app/
├── Contracts/
│   └── Users/
│       ├── UserRepositoryInterface.php
│       └── UserServiceInterface.php
├── Repositories/
│   └── Users/
│       └── UserRepository.php
├── Services/
│   └── Users/
│       └── UserService.php
├── Http/
│   ├── Controllers/
│   │   └── Admin/
│   │       └── UserController.php
│   ├── Requests/
│   │   └── Users/
│   │       ├── CreateUserRequest.php
│   │       ├── UpdateUserRequest.php
│   │       └── AssignRoleRequest.php
│   └── Resources/
│       └── Users/
│           ├── UserResource.php
│           └── UserCollection.php
└── Models/
    ├── User.php
    ├── InstructorProfile.php
    └── StudentProfile.php
```

---

## 12. Seeder & Factory

Urutan eksekusi di DatabaseSeeder:

```
1. RoleSeeder         buat 4 role: dev, admin, instructor, student
2. PermissionSeeder   buat semua permission, assign ke masing-masing role
3. UserSeeder         buat akun default:
     dev@learnhub.id       (role: dev)
     admin@learnhub.id     (role: admin)
     3 x instructor        (role: instructor + instructor_profile terisi)
     10 x student          (role: student + student_profile terisi)
```

Credentials dari .env (jangan hardcode di seeder):

```env
DEV_EMAIL=dev@learnhub.id
DEV_PASSWORD=Dev@123456
ADMIN_EMAIL=admin@learnhub.id
ADMIN_PASSWORD=Admin@123456
```

---

## 13. Migrasi — Urutan File

```
2025_01_01_000001_create_users_table.php
2025_01_01_000002_create_instructor_profiles_table.php
2025_01_01_000003_create_student_profiles_table.php
2025_01_01_000004_create_permission_tables.php        <- dari Spatie
```

---

## 14. Konfigurasi Spatie Permission untuk ULID

Di config/permission.php tidak banyak yang perlu diubah, tapi migration
Spatie perlu dimodifikasi sebelum dijalankan:

```php
// Di file migration create_permission_tables.php
// Ubah semua kolom model_id dari:
$table->unsignedBigInteger('model_id');
// Menjadi:
$table->char('model_id', 26);
```

Juga di AppServiceProvider::boot():

```php
// Pastikan ulid dipakai sebagai primary key
\Illuminate\Support\Str::createUlidsUsing(null); // reset ke default
```

Model User sudah pakai trait HasUlids dari Laravel — tidak perlu konfigurasi
tambahan, $incrementing = false dan $keyType = 'string' sudah otomatis di-set.

---

## 15. Notifikasi Email

| Trigger | Kelas | Penerima |
|---------|-------|----------|
| Register berhasil | WelcomeNotification | User baru |
| Verifikasi email | VerifyEmailNotification | User baru |
| Forgot password | ResetPasswordNotification | User |
| Instructor disetujui | InstructorApprovedNotification | User |
| Instructor ditolak | InstructorRejectedNotification | User |
| Akun disuspend | AccountSuspendedNotification | User |
| Akun diban | AccountBannedNotification | User |
| Login device baru | NewLoginAlertNotification | User |

---

## 16. Security Checklist

- Password di-hash via bcrypt (default Laravel)
- Rate limiting login: max 5 attempt / 1 menit per IP (Filament Login Attempts plugin)
- ULID tidak sequential — tidak bisa di-enumerate seperti integer ID
- Soft delete: data tidak hilang kecuali force delete oleh dev
- Email verifikasi wajib sebelum akses konten premium
- last_login_ip dicatat setiap login untuk keperluan audit
- Permission check di Controller level + Policy level (double check)
- Admin tidak bisa edit atau ban akun dev — hanya dev yang bisa
- Semua endpoint API pakai middleware auth:sanctum + permission check

---

## 17. Acceptance Criteria

Modul Users dinyatakan DONE jika semua poin berikut terpenuhi:

1. Migration berjalan clean di environment fresh (php artisan migrate:fresh --seed)
2. Seeder menghasilkan: 4 role, semua permission ter-assign, user default sesuai spec
3. Login dengan setiap role redirect ke halaman yang benar
4. Admin dapat CRUD user, assign role, ban/unban, suspend/activate
5. User banned tidak bisa login — pesan error ditampilkan dengan jelas
6. Email verifikasi terkirim dan link verifikasi berfungsi
7. Forgot password flow berfungsi end-to-end
8. Halaman profil menampilkan data benar dan semua field bisa diedit
9. Permission check berfungsi — instructor tidak bisa akses menu users
10. Soft delete + restore berfungsi
11. Log aktivitas tercatat untuk semua aksi CRUD (spatie/activitylog)
12. Avatar fallback ke DiceBear jika tidak ada foto profil

---

## 18. Referensi UI

Halaman HTML yang sudah dibuat sebagai acuan implementasi:

| Halaman | File | Status |
|---------|------|--------|
| Daftar Pengguna | users.html | Done |
| Profil Saya | profile.html | Done |
| Role & Permission | roles.html | Done |
| Login | login.html | Done |
| Register | register.html | Done |
| Forgot Password | forgot-password.html | Done |
| Reset Password | reset-password.html | Done |
| Verifikasi Email | verify-email.html | Done |
| Error 403/404/419/500/503 | errors.html | Done |
| Alert Library | lh-alerts.js + lh-alerts-demo.html | Done |

Design tokens yang harus konsisten di seluruh implementasi:

```css
--primary: #2563eb;
--primary-light: #3b82f6;
--primary-xlight: #eff6ff;
--success: #10b981;
--warning: #f59e0b;
--danger: #ef4444;
--purple: #8b5cf6;
--teal: #0d9488;
--sidebar-bg: #0f172a;
--sidebar-w: 260px;
--sidebar-w-col: 72px;
--topbar-h: 64px;
--radius: 14px;
```

Font: Poppins (300/400/500/600/700/800)
Icon: Bootstrap Icons 1.11.3
CSS Framework: Bootstrap 5.3.3

---

Next: PRD Modul Courses & Curriculum
