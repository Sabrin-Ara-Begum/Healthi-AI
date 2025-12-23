import Sidebar from "../components/Sidebar"
import { Search } from "lucide-react"
import { useState } from "react"

const doctors = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    specialty: "Cardiologist",
    location: "Sivasagar, Assam",
    tags: ["Heart", "BP", "ECG"],
    initials: "JD",
  },
  {
    id: 2,
    name: "Dr. Rahul Sharma",
    specialty: "Neurologist",
    location: "Guwahati, Assam",
    tags: ["Brain", "Migraine"],
    initials: "RS",
  },
  {
    id: 3,
    name: "Dr. Ananya Das",
    specialty: "Gynecologist",
    location: "Jorhat, Assam",
    tags: ["Pregnancy", "Care"],
    initials: "AD",
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    specialty: "Psychiatrist",
    location: "Dibrugarh, Assam",
    tags: ["Anxiety", "Stress"],
    initials: "VS",
  },
]

export default function FindDoctor() {
  const [query, setQuery] = useState("")
  const [filteredDoctors, setFilteredDoctors] = useState(doctors)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a medical assistant. Given symptoms, reply with ONLY one doctor specialty like Cardiologist, Neurologist, Gynecologist, Psychiatrist.",
            },
            {
              role: "user",
              content: query,
            },
          ],
        }),
      })

      const data = await res.json()
      const specialty =
        data.choices[0].message.content.trim().toLowerCase()

      const result = doctors.filter((doc) =>
        doc.specialty.toLowerCase().includes(specialty)
      )

      setFilteredDoctors(result.length ? result : doctors)
    } catch (err) {
      console.error(err)
      setFilteredDoctors(doctors)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Find a Doctor
        </h1>

        {/* Search Bar */}
        <div className="flex mb-8">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="Describe your symptoms..."
            className="flex-1 p-3 rounded-l-2xl border border-gray-300 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-purple-600 text-white px-6 rounded-r-2xl hover:bg-purple-700 transition"
          >
            <Search size={20} />
          </button>
        </div>

        {loading && (
          <p className="text-purple-600 mb-6">
            AI is analyzing symptoms...
          </p>
        )}

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                  {doc.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {doc.specialty}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {doc.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-500 mb-4">
                📍 {doc.location}
              </p>

              <button className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}



