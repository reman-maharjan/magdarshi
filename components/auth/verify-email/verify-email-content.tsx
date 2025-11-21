"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useVerifyEmail } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2, XCircle } from "lucide-react"

export default function VerifyEmailContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")
    const callbackURL = searchParams.get("callbackURL")
    const { execute: verifyEmail, isLoading, error, data } = useVerifyEmail()
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("Verifying your email...")

    useEffect(() => {
        if (!token) {
            setStatus("error")
            setMessage("Invalid verification link")
            return
        }

        const verify = async () => {
            try {
                const result = await verifyEmail({
                    token,
                    ...(callbackURL && { callbackURL })
                })
                if (result?.status) {
                    setStatus("success")
                    setMessage("Email verified successfully")
                } else {
                    if (!result) {
                        setStatus("error")
                    }
                }
            } catch (error) {
                setStatus("error")
                setMessage("An error occurred while verifying your email")
            }
        }

        verify()
    }, [token, callbackURL])

    // Sync hook error state to local message
    useEffect(() => {
        if (error) {
            setStatus("error")
            setMessage(error)
        }
    }, [error])

    const handleContinue = () => {
        if (callbackURL) {
            router.push(callbackURL)
        } else {
            router.push("/login")
        }
    }

    return (
        <Card className="w-full max-w-md mx-auto mt-20">
            <CardHeader>
                <CardTitle className="text-center">Email Verification</CardTitle>
                <CardDescription className="text-center">
                    {status === "loading" && "Please wait while we verify your email address."}
                    {status === "success" && "Your email has been successfully verified."}
                    {status === "error" && "We couldn't verify your email address."}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                {status === "loading" && (
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                )}
                {status === "success" && (
                    <CheckCircle2 className="h-10 w-10 text-green-500" />
                )}
                {status === "error" && (
                    <XCircle className="h-10 w-10 text-red-500" />
                )}
                <p className="text-center text-sm text-muted-foreground">{message}</p>
                {status !== "loading" && (
                    <Button onClick={handleContinue} className="w-full">
                        {status === "success" ? "Continue" : "Go to Login"}
                    </Button>
                )}
            </CardContent>
        </Card>
    )
}


