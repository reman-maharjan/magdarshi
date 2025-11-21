import { useState } from "react";
import { authService } from "@/services/auth-service";
import { SignInPayload, SignInResponse, SignUpPayload, SignUpResponse, SendVerificationEmailPayload, SendVerificationEmailResponse } from "@/types/user";
import { VerifyEmailPayload, VerifyEmailResponse } from "@/types/auth";

interface UseAuthResult<T> {
    data: T | null;
    error: string | null;
    isLoading: boolean;
    execute: (payload: any) => Promise<T | void>;
}

export function useSignIn() {
    const [data, setData] = useState<SignInResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const execute = async (payload: SignInPayload) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await authService.signIn(payload);
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, execute };
}

export function useSignUp() {
    const [data, setData] = useState<SignUpResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const execute = async (payload: SignUpPayload) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await authService.signUp(payload);
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, execute };
}

export function useVerifyEmail() {
    const [data, setData] = useState<VerifyEmailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const execute = async (payload: VerifyEmailPayload) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await authService.verifyEmail(payload);
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, execute };
}

export function useSendVerificationEmail() {
    const [data, setData] = useState<SendVerificationEmailResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const execute = async (payload: SendVerificationEmailPayload) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await authService.sendVerificationEmail(payload);
            setData(result);
            return result;
        } catch (err: any) {
            setError(err.message || "An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, execute };
}
