import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div className="flex items-center justify-center rounded-full border border-gray-900 bg-white px-3 py-1 text-xs font-semibold shadow">
    📍 {text}
  </div>
);

export default function Map({
  center,
  zoom = 13,
  locations = [],
  selected,
  onMapClick,
}) {
  const handleClick = ({ lat, lng }) => {
    if (onMapClick) onMapClick({ lat, lng });
  };

  return (
    <div className="h-[420px] w-full overflow-hidden rounded-2xl shadow">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
        zoom={zoom}
        onClick={handleClick}
      >
        {locations.map((loc, idx) => (
          <Marker
            key={`loc-${idx}`}
            lat={loc.lat}
            lng={loc.lng}
            text={loc.title || "Pin"}
          />
        ))}
        {selected ? (
          <Marker
            lat={selected.lat}
            lng={selected.lng}
            text={selected.title || "Selected"}
          />
        ) : null}
      </GoogleMapReact>
    </div>
  );
}
