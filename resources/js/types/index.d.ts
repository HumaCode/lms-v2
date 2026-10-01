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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    menus?: Record<string, MenuItem[]>;
};
