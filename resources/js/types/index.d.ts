export interface User {
    id: string;
    name: string;
    username?: string;
    email: string;
    avatar_url?: string;
    phone?: string;
    bio?: string;
    status?: string;
    email_verified_at?: string;
    role?: string;
}

export interface MenuItem {
    id: string;
    name: string;
    url: string;
    category?: string;
    icon?: string;
    active?: boolean;
    orders?: number;
    main_menu_id?: string | null;
    sub_menus?: MenuItem[];
    subMenus?: MenuItem[];
}

export interface UserRole {
    id?: string;
    name: string;
    slug?: string;
}

export interface UserData {
    id: string;
    name: string;
    username?: string;
    email: string;
    avatar_url?: string;
    phone?: string;
    bio?: string;
    status: 'active' | 'inactive' | 'suspended' | string;
    email_verified_at?: string | null;
    is_verified: boolean;
    role?: UserRole | null;
    created_at?: string;
    created_at_human?: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

export interface UserMetrics {
    total_users: number;
    active_students: number;
    instructors_count: number;
    unverified_count: number;
    role_counts: Record<string, number>;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    menus?: Record<string, MenuItem[]>;
    flash?: {
        success?: string;
        error?: string;
    };
};

