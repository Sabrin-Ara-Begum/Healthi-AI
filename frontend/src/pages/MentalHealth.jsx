import { useState, useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AnimatePresence, motion } from "framer-motion";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const moodEmojis = [
  { label: "😡", value: 1, text: "Angry" },
  { label: "😞", value: 2, text: "Sad" },
  { label: "😐", value: 3, text: "Neutral" },
  { label: "😊", value: 4, text: "Happy" },
  { label: "😁", value: 5, text: "Excited" },
];

export default function MentalHealth() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedMood, setSelectedMood] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const aiEndRef = useRef(null);

  // Scroll AI chat to bottom
  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [aiMessages]);

  // Save mood history in localStorage
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

  const handleMoodSelect = (mood) => {
    const entry = { mood: mood.value, label: mood.label, date: new Date().toLocaleDateString() };
    setHistory((prev) => [...prev, entry]);
    setSelectedMood(mood.value);
  };

  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
    const userMsg = { sender: "user", text: aiInput };
    setAiMessages((prev) => [...prev, userMsg]);
    setAiInput("");

    try {
      const res = await fetch("http://localhost:5001/api/openrouter/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiInput }),
      });
      const data = await res.json();
      const aiMsg = { sender: "ai", text: data.reply || "AI response unavailable" };
      setAiMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setAiMessages((prev) => [...prev, { sender: "ai", text: "Error: Unable to reach AI." }]);
    }
  };

  // Calculate stress score
  const avgMood =
    history.length > 0 ? history.reduce((sum, h) => sum + h.mood, 0) / history.length : 0;
  const stressScore = Math.round((5 - avgMood) * 20);

  // Prepare chart data
  const chartData = {
    labels: history.map((h) => h.date),
    datasets: [
      {
        label: "Mood",
        data: history.map((h) => h.mood),
        fill: false,
        borderColor: "#7c3aed",
        backgroundColor: "#7c3aed",
        tension: 0.3,
      },
    ],
  };

  // Weekly Insights
  const mostFrequentMood = history.length
    ? moodEmojis.reduce((a, b) => {
        const aCount = history.filter((h) => h.mood === a.value).length;
        const bCount = history.filter((h) => h.mood === b.value).length;
        return aCount > bCount ? a : b;
      })
    : null;

  const insights = [
    `Most frequent mood: ${mostFrequentMood ? mostFrequentMood.text : "N/A"}`,
    `Total entries this week: ${history.length}`,
    `Current stress score: ${stressScore}`,
  ];

  return (
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mental Health Tracker</h1>

      {/* Mood Input */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">How are you feeling today?</h2>
        <div className="flex gap-4">
          {moodEmojis.map((m) => (
            <button
              key={m.value}
              onClick={() => handleMoodSelect(m)}
              className={`text-2xl p-3 rounded-xl hover:bg-purple-100 transition ${
                selectedMood === m.value ? "bg-purple-200" : "bg-white"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mood Chart */}
      <div className="mb-6 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Weekly Mood Review</h2>
        {history.length > 0 ? (
          <Line data={chartData} />
        ) : (
          <p className="text-gray-500">No mood data yet</p>
        )}
      </div>

      {/* Stress Score */}
      <div className="mb-6 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">Stress/Anxiety Score</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-purple-600 h-4 rounded-full"
            style={{ width: `${stressScore}%` }}
          ></div>
        </div>
        <p className="mt-2 text-gray-700">{stressScore}%</p>
      </div>

      {/* Weekly Insights */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            {insight}
          </div>
        ))}
      </div>

      {/* AI Mental Health Companion */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-2">AI Mental Health Companion</h2>
        <div className="flex flex-col gap-2 max-h-80 overflow-y-auto mb-2">
          <AnimatePresence>
            {aiMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`p-3 rounded-xl max-w-xs break-words ${
                  msg.sender === "user"
                    ? "self-end bg-purple-600 text-white"
                    : "self-start bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={aiEndRef}></div>
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-xl focus:outline-none"
          />
          <button
            onClick={handleAiSend}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

