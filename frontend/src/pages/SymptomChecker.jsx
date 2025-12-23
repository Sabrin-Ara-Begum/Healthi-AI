import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SymptomChecker() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const analyzeSymptoms = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:5001/api/openrouter/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `
You are a medical symptom analysis assistant.

User symptoms:
"${input}"

Respond strictly in this JSON format:
{
  "symptoms": "...",
  "possible_diseases": ["...", "..."],
  "confidence": "0-100%",
  "recommended_doctor": "Doctor specialization"
}
`
        }),
      });

      if (!res.ok) throw new Error("AI request failed");

      const data = await res.json();

      // backend sends { reply: string }
      const parsed = JSON.parse(data.reply);

      setResult(parsed);
    } catch (err) {
      console.error(err);
      setError("Unable to analyze symptoms. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToFindDoctor = () => {
    navigate("/find-doctor", {
      state: { specialty: result.recommended_doctor },
    });
  };

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        AI-Based Symptom Checker
      </h1>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Describe your symptoms..."
          className="flex-1 p-3 rounded-l-2xl border border-gray-300 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={analyzeSymptoms}
          className="bg-purple-600 text-white px-6 rounded-r-2xl hover:bg-purple-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 mb-4 font-medium">{error}</div>
      )}

      {/* Result Card */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">
              Symptoms Entered
            </h3>
            <p className="text-gray-600">{result.symptoms}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              Possible Diseases
            </h3>
            <ul className="list-disc ml-6 text-gray-600">
              {result.possible_diseases.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              Confidence Level
            </h3>
            <p className="text-gray-600">{result.confidence}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">
              Recommended Doctor
            </h3>
            <p className="text-gray-600">{result.recommended_doctor}</p>
          </div>

          <button
            onClick={goToFindDoctor}
            className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition"
          >
            Find {result.recommended_doctor}
          </button>
        </div>
      )}
    </div>
  );
}
