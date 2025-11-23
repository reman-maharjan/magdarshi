"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Mail, ArrowLeft } from "lucide-react"

export default function ForgotPasswordContent() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            toast.error("Please enter your email address")
            return
        }

        setLoading(true)
        try {
            const redirectTo = `${window.location.origin}/auth/reset-password`

            await authClient.forgetPassword({
                email,
                redirectTo,
            }, {
                onSuccess: () => {
                    setEmailSent(true)
                    toast.success("Password reset email sent successfully")
                },
                onError: (ctx: any) => {
                    toast.error(ctx.error.message || "Failed to send reset email")
                    setLoading(false)
                }
            })
        } catch (error: any) {
            toast.error(error.message || "An error occurred while sending reset email")
            setLoading(false)
        }
    }

    if (emailSent) {
        return (
            <Card className="w-full max-w-md mx-auto mt-20">
                <CardHeader>
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <Mail className="w-8 h-8 text-green-700 dark:text-green-400" />
                        </div>
                    </div>
                    <CardTitle className="text-center">Check Your Email</CardTitle>
                    <CardDescription className="text-center">
                        We've sent a password reset link to <strong>{email}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        Click the link in the email to reset your password. If you don't see the email, check your spam folder.
                    </p>
                    <Button
                        onClick={() => router.push("/login")}
                        className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            setEmailSent(false)
                            setEmail("")
                            setLoading(false)
                        }}
                        className="w-full"
                    >
                        Try Another Email
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-center">Forgot Password?</CardTitle>
                <CardDescription className="text-center">
                    Enter your email address and we'll send you a link to reset your password.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        <Input
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                            disabled={loading}
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Reset Link"
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => router.push("/login")}
                        className="w-full"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
