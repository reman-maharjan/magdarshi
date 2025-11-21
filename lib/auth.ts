import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: {
        // Note: You'll need to configure this based on your database
        // For example, if using Prisma:
        // provider: "prisma",
        // Or if using a direct connection:
        // type: "postgres", // or "mysql", "sqlite", etc.
        // url: process.env.DATABASE_URL,
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    plugins: [
        nextCookies(),
    ],
    // Optional: Configure email verification
    // emailVerification: {
    //   sendVerificationEmail: async ({ user, url }) => {
    //     // Send email with verification link
    //   },
    // },
});
