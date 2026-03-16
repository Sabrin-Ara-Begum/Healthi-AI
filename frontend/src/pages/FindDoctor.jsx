import { useState, useEffect } from "react";

export default function FindDoctor({ redirectSpeciality = "" }) {
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  const [speciality, setSpeciality] = useState(redirectSpeciality);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Dummy doctors data with coordinates
  const doctors = [
    {
      name: "Dr. Ananya Sharma",
      speciality: "Cardiologist",
      clinic: "Apollo Clinic",
      coords: { lat: 26.2006, lng: 92.7898 },
    },
    {
      name: "Dr. Rahul Das",
      speciality: "General Physician",
      clinic: "City Health Center",
      coords: { lat: 26.2050, lng: 92.7800 },
    },
    {
      name: "Dr. Meera Gupta",
      speciality: "Dermatologist",
      clinic: "SkinCare Clinic",
      coords: { lat: 26.1980, lng: 92.7950 },
    },
    {
      name: "Dr. Arjun Bora",
      speciality: "Neurologist",
      clinic: "Neuro Health",
      coords: { lat: 26.2100, lng: 92.7850 },
    },
  ];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }),
        (err) => console.error("Location error:", err)
      );
    }
  }, []);

  // Haversine formula to calculate distance in km
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Filter doctors whenever location or speciality changes
  useEffect(() => {
    if (!userLocation.lat) return;
    const results = doctors.filter((doc) => {
      const distance = getDistanceFromLatLonInKm(
        userLocation.lat,
        userLocation.lng,
        doc.coords.lat,
        doc.coords.lng
      );
      return (
        doc.speciality.toLowerCase().includes(speciality.toLowerCase()) &&
        distance <= 10
      );
    });
    setFilteredDoctors(results);
  }, [userLocation, speciality]);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">
        Find a Doctor
      </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by speciality..."
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
        className="w-full max-w-md p-3 mb-6 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {/* Map */}
      {userLocation.lat && userLocation.lng && (
        <div className="mb-6 rounded-xl overflow-hidden shadow">
          <iframe
            title="user-location-map"
            width="100%"
            height="300"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyA2J4XF_EAhFPfjLeIc0ozOv6ar8cBLrGk&center=${userLocation.lat},${userLocation.lng}&zoom=14`}
          ></iframe>
        </div>
      )}

      {/* Doctor Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredDoctors.length === 0 ? (
          <p className="text-gray-500">No doctors found within 10 km.</p>
        ) : (
          filteredDoctors.map((doc, index) => {
            const distance = getDistanceFromLatLonInKm(
              userLocation.lat,
              userLocation.lng,
              doc.coords.lat,
              doc.coords.lng
            ).toFixed(1);
            return (
              <div
                key={index}
                className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-purple-700">
                  {doc.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{doc.speciality}</p>
                <p className="text-xs text-gray-500 mt-2">
                  📍 {distance} km • {doc.clinic}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
