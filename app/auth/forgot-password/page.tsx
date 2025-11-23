import { Suspense } from "react"
import ForgotPasswordContent from "@/components/auth/forgot-password/forgot-password-content"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
            <Suspense fallback={
                <Card className="w-full max-w-md mx-auto">
                    <CardContent className="flex items-center justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-green-700" />
                    </CardContent>
                </Card>
            }>
                <ForgotPasswordContent />
            </Suspense>
        </div>
    )
}
