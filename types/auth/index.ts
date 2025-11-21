import { User } from "@/types/user";

export interface VerifyEmailPayload {
    token: string;
    callbackURL?: string;
}

export interface VerifyEmailResponse {
    user: User;
    status: boolean;
}
