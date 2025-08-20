import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg border border-indigo-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥡</span>
          <h1 className="text-2xl font-extrabold text-gray-900">Sign in to ShareBite</h1>
        </div>
        <p className="mt-1 text-gray-600">Use your Google account to continue.</p>

        <button
          onClick={() => signIn('google')}
          className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow hover:bg-indigo-500 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-xs text-gray-500">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </main>
  );
}
