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

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};
