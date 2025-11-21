import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    basePath: `${process.env.NEXT_PUBLIC_API_URL} / api / auth`,
    plugins: [
        usernameClient()
    ]
})
