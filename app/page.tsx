'use client';
import { authClient } from "@/lib/auth-client";

export default function Home() {

  const { data: session, isPending: isLoading } = authClient.useSession()

  if (!isLoading) {
    return <div className="flex justify-center items-center h-screen">
      Loading...
    </div>;
  }

  if (session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome {session.user?.name}</h1>
          <p className="text-gray-600 mb-4">You are logged in</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => authClient.signOut()}>Sign out</button>
        </div>
      </div>
    )
  }
}
