import { Suspense } from "react";
import ResetPasswordContent from "@/components/auth/reset-password/reset-password-content";

export default function ResetPasswordPage() {
    return (
        <div className="container mx-auto px-4">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordContent />
            </Suspense>
        </div>
    )
}