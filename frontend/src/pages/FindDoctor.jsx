import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FindDoctor() {
  const location = useLocation();
  const [specialty, setSpecialty] = useState("");

  // Auto-fill if redirected from Symptom Checker
  useEffect(() => {
    if (location.state?.specialty) {
      setSpecialty(location.state.specialty);
    }
  }, [location.state]);

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Find a Doctor
      </h1>

      <input
        type="text"
        placeholder="Enter doctor specialization..."
        className="w-full p-4 rounded-2xl border border-gray-300 focus:outline-none mb-6"
        value={specialty}
        onChange={(e) => setSpecialty(e.target.value)}
      />

      <div className="bg-white rounded-2xl shadow-md p-6 text-gray-600">
        Showing doctors for:{" "}
        <span className="font-semibold text-gray-800">
          {specialty || "—"}
        </span>
      </div>
    </div>
  );
}




