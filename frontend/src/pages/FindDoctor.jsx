import { useState } from "react";

export default function FindDoctor() {
  const [speciality, setSpeciality] = useState("");

  return (
    <div className="p-6 space-y-6">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-purple-700">
        Find a Doctor Near You
      </h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by speciality (e.g. Cardiologist)"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* WORKING MAP (no API, no crash) */}
      <div className="w-full h-64 rounded-xl overflow-hidden shadow">
        <iframe
          title="map"
          width="100%"
          height="100%"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=hospital%20near%20me&output=embed"
        />
      </div>

      {/* Doctor cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Dr. Ananya Sharma</h3>
          <p className="text-sm text-gray-600">
            Cardiologist • 2.3 km away
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Dr. Rahul Das</h3>
          <p className="text-sm text-gray-600">
            General Physician • 4.1 km away
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="font-semibold text-lg">Dr. Meera Gupta</h3>
          <p className="text-sm text-gray-600">
            Dermatologist • 6 km away
          </p>
        </div>
      </div>
    </div>
  );
}
