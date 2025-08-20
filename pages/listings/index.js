import { useEffect, useState } from "react";
import Link from "next/link";

export default function ListingsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch("/api/listings");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setItems(data || []);
      } catch (e) {
        setError("Could not load listings.");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Listings</h1>
          <p className="text-gray-600">Browse recently posted food shares.</p>
        </div>
        <Link href="/listings/new" className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition shadow">
          + Add Listing
        </Link>
      </header>

      <section className="mt-6">
        {loading ? (
          <div className="rounded-2xl bg-white p-6 shadow border border-gray-200">Loading…</div>
        ) : error ? (
          <div className="rounded-2xl bg-red-50 text-red-700 p-6 shadow border border-red-200">{error}</div>
        ) : items.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow border border-gray-200">
            <p className="text-gray-700">No listings yet. Be the first to post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((l, i) => (
              <div key={l._id || i} className="rounded-2xl bg-white p-5 shadow hover:shadow-lg transition border border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{l.title}</h3>
                  <span className="text-xs text-gray-500">{l.category || "General"}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{l.description}</p>
                {typeof l.lat === "number" && typeof l.lng === "number" && (
                  <p className="mt-2 text-xs text-gray-500">Lat: {l.lat.toFixed(4)} • Lng: {l.lng.toFixed(4)}</p>
                )}
                <div className="mt-4 flex justify-end">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded hover:bg-blue-200">Request</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
