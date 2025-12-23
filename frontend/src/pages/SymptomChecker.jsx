import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function SymptomChecker() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    return JSON.parse(localStorage.getItem("symptomChat")) || [];
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("symptomChat", JSON.stringify(messages));
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // Call backend
      const res = await fetch("http://localhost:5001/api/openrouter/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (!res.ok) throw new Error("AI request failed");

      const data = await res.json();

      // Example: parse your AI response (adjust to your backend response structure)
      const aiMsg = {
        type: "ai",
        text: data.reply || "AI could not generate a response",
        symptoms: data.symptoms || input,
        possibleDiseases: data.possibleDiseases || ["Not detected"],
        confidence: data.confidence || "N/A",
        recommendedDoctor: data.recommendedDoctor || "General Physician",
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Error: Unable to get AI response" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const goToFindDoctor = (doctor) => {
    navigate("/find-doctor", { state: { specialty: doctor } });
  };

  return (
    <div className="px-8 py-10 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Symptom Checker</h1>

      <div className="flex flex-col gap-4">
        {messages.map((msg, idx) =>
          msg.type === "user" ? (
            <div key={idx} className="flex justify-end" ref={scrollRef}>
              <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl inline-block max-w-[60%] break-words">
                {msg.text}
              </div>
            </div>
          ) : (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 max-w-2xl w-full mx-auto"
            >
              {msg.text && <p className="text-gray-800 mb-4">{msg.text}</p>}

              {msg.symptoms && (
                <>
                  <h2 className="font-semibold text-gray-800 mb-1">
                    Symptoms Entered:
                  </h2>
                  <p className="text-gray-500 mb-3">{msg.symptoms}</p>

                  <h2 className="font-semibold text-gray-800 mb-1">
                    Possible Diseases:
                  </h2>
                  <ul className="list-disc ml-6 mb-3">
                    {msg.possibleDiseases.map((d, i) => (
                      <li key={i} className="text-gray-500">{d}</li>
                    ))}
                  </ul>

                  <h2 className="font-semibold text-gray-800 mb-1">Confidence:</h2>
                  <p className="text-gray-500 mb-3">{msg.confidence}</p>

                  <h2 className="font-semibold text-gray-800 mb-1">
                    Recommended Doctor:
                  </h2>
                  <p className="text-gray-500 mb-3">{msg.recommendedDoctor}</p>

                  <button
                    className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700"
                    onClick={() => goToFindDoctor(msg.recommendedDoctor)}
                  >
                    Visit Find Doctor
                  </button>
                </>
              )}
            </div>
          )
        )}
      </div>

      {/* Input area */}
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter your symptoms..."
          className="flex-1 p-3 rounded-l-2xl border border-gray-300 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className={`bg-purple-600 text-white px-6 rounded-r-2xl hover:bg-purple-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? "..." : "Ask"}
        </button>
      </div>
    </div>
  );
}

