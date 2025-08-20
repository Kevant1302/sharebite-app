import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

export default function NewListing() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({ title: "", description: "" });
  const [center, setCenter] = useState({ lat: 51.045, lng: -114.07 }); // Calgary default
  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState("");

  // Redirect unauthenticated users to login; otherwise welcome
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const welcome = useMemo(() => {
    if (status === "authenticated" && session?.user) {
      return `Welcome back, ${session.user.name?.split(" ")[0] || "friend"} 👋 Ready to add a new listing?`;
    }
    return "";
  }, [status, session]);

  const reverseGeocode = async (lat, lng) => {
    try {
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!key) return;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`;
      const res = await fetch(url);
      const data = await res.json();
      const result = data.results?.[0];
      setAddress(result?.formatted_address || "Address not found");
    } catch (e) {
      setAddress("Address lookup failed");
    }
  };

  const onMapClick = async ({ lat, lng }) => {
    const pos = { lat, lng };
    setSelected(pos);
    await reverseGeocode(lat, lng);
  };

  const detectMyLocation = () => {
    setGeoError("");
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const c = { lat: latitude, lng: longitude };
        setCenter(c);
        setSelected(c);
        await reverseGeocode(latitude, longitude);
      },
      (err) => {
        setGeoError("Unable to retrieve your location.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) return;
    if (!selected) {
      alert("Please choose a location on the map.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          lat: selected.lat,
          lng: selected.lng,
          address
        }),
      });
      if (!res.ok) throw new Error("Failed");
      await res.json();
      router.push("/listings");
    } catch (e) {
      alert("There was a problem creating the listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      {welcome ? (
        <div className="mb-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-indigo-900">
          {welcome}
        </div>
      ) : null}

      <h1 className="text-3xl font-bold text-gray-900">Add a new listing</h1>
      <p className="text-gray-600">Pick a location by clicking on the map or use your current location.</p>

      <div className="mt-6 rounded-2xl bg-white p-5 shadow border border-gray-200">
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={detectMyLocation}
            type="button"
            className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition shadow"
          >
            Detect My Location
          </button>
          {geoError ? <span className="text-sm text-red-600">{geoError}</span> : null}
        </div>

        <Map center={center} zoom={13} selected={selected} onMapClick={onMapClick} />

        <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
          <div className="text-sm text-gray-700">
            <span className="font-semibold">Selected Address: </span>
            {address || "None yet"}
          </div>
          {selected ? (
            <div className="mt-1 text-xs text-gray-500">
              Lat: {selected.lat.toFixed(5)} • Lng: {selected.lng.toFixed(5)}
            </div>
          ) : null}
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-6 rounded-2xl bg-white p-6 shadow border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g., Extra homemade pasta"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Add pickup notes, quantity, allergens…"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => history.back()}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Saving…" : "Save Listing"}
          </button>
        </div>
      </form>
    </main>
  );
}
