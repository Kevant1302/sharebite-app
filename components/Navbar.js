import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();
  const avatar = session?.user?.image;

  return (
    <nav className="sticky top-0 z-40 w-full bg-gray-900 text-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-2xl">🥡</span>
          <strong className="text-lg sm:text-xl">ShareBite</strong>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="hidden sm:inline-block text-gray-300 hover:text-white transition">Home</Link>
          <Link href="/dashboard" className="hidden sm:inline-block text-gray-300 hover:text-white transition">Dashboard</Link>
          <Link href="/listings" className="hidden sm:inline-block text-gray-300 hover:text-white transition">Listings</Link>

          {session?.user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/listings/new"
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition shadow"
              >
                + Add Listing
              </Link>
              {avatar ? (
                <img
                  src={avatar}
                  alt={session.user.name || "Profile"}
                  className="h-8 w-8 rounded-full ring-2 ring-white/20 object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : null}
              <button
                onClick={() => signOut()}
                className="rounded-xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 transition"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition shadow"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
