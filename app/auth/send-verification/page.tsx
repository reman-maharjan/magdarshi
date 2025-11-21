"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

function SendVerificationContent() {
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-950">
            <Card className="w-full max-w-md p-8 text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                        <Mail size={32} />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        We have sent a verification link to
                        {email && <span className="block font-medium text-gray-900 dark:text-white mt-1">{email}</span>}
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click the link in the email to verify your account. If you don't see the email, check your spam folder.
                    </p>

                    <div className="pt-2">
                        <Link href="/login">
                            <Button className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-2.5 rounded-full transition-colors">
                                Back to Sign in
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default function SendVerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SendVerificationContent />
        </Suspense>
    )
}
