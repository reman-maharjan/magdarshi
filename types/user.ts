export interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface SignInResponse {
    redirect: boolean;
    token: string | null;
    url: string | null;
    user: User;
}

export interface SignUpResponse {
    token: string | null;
    user: User;
}

export interface SignInPayload {
    email: string;
    password?: string;
    callbackURL?: string;
    rememberMe?: boolean;
}

export interface SignUpPayload {
    name: string;
    email: string;
    password?: string;
    image?: string;
    callbackURL?: string;
    rememberMe?: boolean;
}

export interface SendVerificationEmailPayload {
    email: string;
    callbackURL?: string;
}

export interface SendVerificationEmailResponse {
    status: boolean;
    message?: string;
}
