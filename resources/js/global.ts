/**
 * global.ts - Utility and Helper Scripts for LMS Layout & Navigation
 */

export interface MenuItem {
    name: string;
    path: string;
    icon: string;
    category?: string;
    children?: {
        name: string;
        path: string;
    }[];
}

/**
 * Format currency to Indonesian Rupiah (IDR)
 */
export function formatRupiah(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount).replace('Rp', 'Rp ');
}

/**
 * Format number with thousand separator
 */
export function formatNumber(num: number): string {
    return new Intl.NumberFormat('id-ID').format(num);
}

/**
 * Get display greeting based on current time
 */
export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat Pagi';
    if (hour < 15) return 'Selamat Siang';
    if (hour < 18) return 'Selamat Sore';
    return 'Selamat Malam';
}

/**
 * Get formatted current date string (Indonesian locale)
 */
export function getFormattedCurrentDate(): string {
    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());
}

/**
 * Dark mode toggle helper
 */
export function toggleDarkMode(): boolean {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    return isDark;
}

/**
 * Initialize theme preference from localStorage (defaults to light)
 */
export function initTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    // Default to light unless user explicitly chose dark
    const isDark = savedTheme === 'dark';

    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    return isDark;
}
