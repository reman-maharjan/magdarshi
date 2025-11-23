'use client';
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, isPending: isLoading } = authClient.useSession();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl duration-300">
        <div className="p-8 text-center">
          {session ? (
            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👋</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome back!
                </h1>
                <p className="text-lg text-blue-600 font-medium">
                  {session.user?.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {session.user?.email}
                </p>
              </div>

              <button
                onClick={async () => {
                  await authClient.signOut();
                  router.refresh();
                }}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Sign Out</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                  Margadarshi
                </h1>
                <p className="text-gray-600">
                  Your journey to excellence starts here.
                </p>
              </div>

              <div className="space-y-4">
                <Link
                  href="/login"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/30"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block w-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
                >
                  Create Account
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
