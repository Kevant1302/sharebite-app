// Author: Kevant Patel (Tailwind modernization)
// Date: 2025-08-19
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Share surplus food. <span className="text-indigo-600">Help your community.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          ShareBite connects neighbors to reduce food waste and support those in need—quickly and safely.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/dashboard" className="rounded-2xl bg-indigo-600 px-6 py-3 font-medium text-white shadow hover:bg-indigo-500 transition">
            View Map
          </Link>
          <Link href="/login" className="rounded-2xl border border-indigo-600 px-6 py-3 font-medium text-indigo-600 hover:bg-indigo-50 transition">
            Sign in
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Post a Listing", desc: "Offer extra meals or groceries to your neighbors.", icon: "🍲" },
            { title: "Browse Nearby", desc: "Find available food near you—real-time on the map.", icon: "🗺️" },
            { title: "Pick Up Safely", desc: "Coordinate an easy, safe pickup with chat.", icon: "🤝" },
          ].map((c, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">{c.title}</h3>
              <p className="mt-2 text-gray-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
