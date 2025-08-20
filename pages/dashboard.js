import { useSession, signOut } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const listings = [
  { lat: 51.0447, lng: -114.0719, title: "Downtown" },
  { lat: 51.0486, lng: -114.0708, title: "East Village" }
];

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)] bg-gradient-to-br from-gray-50 to-gray-100 px-6">
        <div className="text-center p-10 bg-white rounded-2xl shadow-xl border border-gray-200 max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">You’re not signed in</h2>
          <p className="text-gray-600 mb-6">Sign in to view the live map and your listings.</p>
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/listings/new"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow"
            >
              + Add Listing
            </Link>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Map Overview</h2>
          <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-200">
            <Map center={{ lat: 51.045, lng: -114.07 }} zoom={13} locations={listings} />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Picks</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition">
                <h3 className="text-lg font-semibold text-gray-900">{l.title}</h3>
                <p className="text-sm text-gray-600 mt-1">Lat: {l.lat.toFixed(4)} • Lng: {l.lng.toFixed(4)}</p>
                <div className="mt-4 flex justify-end gap-2">
                  <Link href="/listings" className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">Details</Link>
                  <button className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200">Request</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
