import { useLocation } from "react-router-dom";
import { Stethoscope, MapPin } from "lucide-react";

export default function FindDoctor() {
  const location = useLocation();
  const specialtyFromSymptomChecker = location.state?.specialty || "";

  // Dummy doctors (later this will come from backend)
  const doctors = [
    {
      name: "Dr. Ananya Sharma",
      specialty: "Cardiologist",
      location: "Apollo Hospital, Delhi",
    },
    {
      name: "Dr. Rahul Mehta",
      specialty: "General Physician",
      location: "Fortis Clinic, Bangalore",
    },
    {
      name: "Dr. Priya Das",
      specialty: "Pulmonologist",
      location: "AMRI Hospital, Kolkata",
    },
  ];

  return (
    <main className="px-10 py-12 bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Find a Doctor
        </h1>
        <p className="text-gray-500 max-w-2xl">
          Search and connect with trusted healthcare professionals near you.
        </p>
      </section>

      {/* Search Bar */}
      <section className="mb-12">
        <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-3 max-w-3xl">
          <Stethoscope className="text-purple-600" />
          <input
            type="text"
            defaultValue={specialtyFromSymptomChecker}
            placeholder="Search by specialty (e.g. Cardiologist)"
            className="flex-1 outline-none text-gray-700"
          />
        </div>
      </section>

      {/* Doctor Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doc, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {doc.name}
              </h3>
              <p className="text-purple-600 font-medium">
                {doc.specialty}
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-500 mb-6">
              <MapPin size={18} />
              <span className="text-sm">{doc.location}</span>
            </div>

            <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-xl font-semibold hover:opacity-90 transition">
              Book Appointment
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
