"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Chrome, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useSignIn, useSignUp, useSendVerificationEmail } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function SignupPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const [rememberMe, setRememberMe] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const router = useRouter()

    const { execute: signIn, isLoading: isSignInLoading } = useSignIn()
    const { execute: signUp, isLoading: isSignUpLoading } = useSignUp()
    const { execute: sendVerificationEmail, isLoading: isSendVerificationEmailLoading } = useSendVerificationEmail()

    const loading = isSignInLoading || isSignUpLoading || isSendVerificationEmailLoading

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = (error) => reject(error)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const imageBase64 = image ? await convertToBase64(image) : undefined
            if (isSignUp) {
                const result = await signUp({
                    email,
                    password,
                    name,
                    image: imageBase64,
                    rememberMe,
                    callbackURL: window.location.origin
                })

                if (result) {
                    await sendVerificationEmail({
                        email,
                        callbackURL: `${window.location.origin}/auth/verify-email`
                    })
                    toast.success("Account created successfully. Please check your email to verify your account.")
                    // Automatically sign in or redirect to login?
                    // The original code redirected to login
                    router.push(`/auth/send-verification?email=${encodeURIComponent(email)}`)
                }
            } else {
                const result = await signIn({
                    email,
                    password,
                    rememberMe,
                    callbackURL: window.location.origin
                })

                if (result) {
                    toast.success("Logged in successfully")
                    router.push("/")
                }
            }
        } catch (error) {
            console.error(error)
            toast.error("An unexpected error occurred")
        }
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white dark:bg-gray-950">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            {isSignUp ? "Create Account" : "Sign in"}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {isSignUp ? (
                                <>
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => setIsSignUp(false)}
                                        className="text-green-700 dark:text-green-400 font-semibold hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </>
                            ) : (
                                <>
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => setIsSignUp(true)}
                                        className="text-green-700 dark:text-green-400 font-semibold hover:underline"
                                    >
                                        Create now
                                    </button>
                                </>
                            )}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {isSignUp && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Username</label>
                                    <Input
                                        type="text"
                                        placeholder="johndoe"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">E-mail</label>
                            <Input
                                type="email"
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 pr-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {isSignUp && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Profile Image</label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                                />
                            </div>
                        )}

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 accent-green-700 rounded"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-green-700 dark:text-green-400 hover:underline font-medium">
                                Forgot Password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <Button
                            type="submit"
                            className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white font-semibold py-2.5 rounded-full transition-colors"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : isSignUp ? "Create Account" : "Sign in"}
                        </Button>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-3 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-400">OR</span>
                            </div>
                        </div>

                        {/* Social Auth */}
                        <div className="space-y-3">
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                <Chrome size={20} />
                                Continue with Google
                            </button>
                            <button
                                type="button"
                                className="w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                                <Facebook size={20} />
                                Continue with Facebook
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right Side - Hero */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-800 to-green-900 dark:from-green-900 dark:to-green-950 flex-col items-center justify-center p-8 text-white relative overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-700 rounded-full opacity-20 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

                <div className="relative z-10 max-w-md text-center">
                    {/* Card */}
                    <Card className="mb-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-2xl">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold mb-2">Reach financial goals faster</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Use your card around the world. Transfer and spend money.
                                </p>
                            </div>
                            <div className="w-24 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                Card
                            </div>
                        </div>
                        <Button className="w-full bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-full">
                            Learn More
                        </Button>
                    </Card>

                    {/* Features */}
                    <div>
                        <h2 className="text-2xl font-bold mb-3">Introducing new features</h2>
                        <p className="text-green-100 leading-relaxed">
                            Analyzing previous trends ensures that businesses always make the right decision. And as the scale of...
                        </p>

                        {/* Dots Navigation */}
                        <div className="flex justify-center gap-2 mt-6">
                            <button className="w-2 h-2 bg-white rounded-full hover:bg-green-200 transition"></button>
                            <button className="w-2 h-2 bg-white/50 rounded-full hover:bg-green-200 transition"></button>
                            <button className="w-2 h-2 bg-white/50 rounded-full hover:bg-green-200 transition"></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
