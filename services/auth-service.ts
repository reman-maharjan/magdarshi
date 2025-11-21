import { SignInPayload, SignInResponse, SignUpPayload, SignUpResponse, SendVerificationEmailPayload, SendVerificationEmailResponse } from "@/types/user";
import { VerifyEmailPayload, VerifyEmailResponse } from "@/types/auth";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;

export const authService = {
    async signIn(payload: SignInPayload): Promise<SignInResponse> {
        const response = await fetch(`${API_URL}/sign-in/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to sign in");
        }

        return response.json();
    },

    async signUp(payload: SignUpPayload): Promise<SignUpResponse> {
        const response = await fetch(`${API_URL}/sign-up/email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to sign up");
        }

        return response.json();
    },

    async verifyEmail(payload: VerifyEmailPayload): Promise<VerifyEmailResponse> {
        // Only send the token - the backend includes callback info in the token itself
        const queryParams = new URLSearchParams({
            token: payload.token,
        });
        const response = await fetch(`${API_URL}/verify-email?${queryParams}`, {
            method: "GET",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to verify email");
        }

        return response.json();
    },

    async sendVerificationEmail(payload: SendVerificationEmailPayload): Promise<SendVerificationEmailResponse> {
        const response = await fetch(`${API_URL}/send-verification-email`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to send verification email");
        }

        return response.json();
    },
};
