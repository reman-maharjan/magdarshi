import { Suspense } from "react";
import VerifyEmailContent from "@/components/auth/verify-email/verify-email-content";


export default function VerifyEmailPage() {
    return (
        <div className="container mx-auto px-4">
            <Suspense fallback={<div>Loading...</div>}>
                <VerifyEmailContent />
            </Suspense>
        </div>
    )
}