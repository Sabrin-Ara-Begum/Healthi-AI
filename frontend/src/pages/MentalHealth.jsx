import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageWithSidebar from "../components/PageWithSidebar";
import PanicBreathing from "../components/PanicBreathing";


const moodEmojis = [
  { label: "😡", value: 1, text: "Angry", color: "bg-red-500" },
  { label: "😞", value: 2, text: "Sad", color: "bg-orange-400" },
  { label: "😐", value: 3, text: "Neutral", color: "bg-yellow-400" },
  { label: "😊", value: 4, text: "Happy", color: "bg-green-400" },
  { label: "😁", value: 5, text: "Excited", color: "bg-emerald-500" },
];

export default function MentalHealth() {
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("moodHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedMood, setSelectedMood] = useState(null);
  const [aiInput, setAiInput] = useState("");
  const [aiMessages, setAiMessages] = useState(() => {
    const saved = localStorage.getItem("aiChat");
    return saved ? JSON.parse(saved) : [];
  });

  const aiEndRef = useRef(null);
  const userHasChattedRef = useRef(false);


  /* ---------------- persistence ---------------- */
  useEffect(() => {
    localStorage.setItem("moodHistory", JSON.stringify(history));
  }, [history]);

useEffect(() => {
  if (!userHasChattedRef.current) return;
  aiEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [aiMessages]);


  /* ---------------- mood ---------------- */
  const handleMoodSelect = (mood) => {
    const entry = {
      mood: mood.value,
      color: mood.color,
      date: new Date().toLocaleDateString(),
    };
    setHistory((prev) => [...prev, entry]);
    setSelectedMood(mood.value);
  };

  /* ---------------- stress score (FIXED) ---------------- */
  let stressScore = 0;
  if (history.length > 0) {
    const total = history.reduce(
      (sum, h) => sum + (Number(h.mood) || 0),
      0
    );
    const avg = total / history.length;
    stressScore = Math.round((5 - avg) * 20);
  }

  /* ---------------- weekly bars ---------------- */
  const last7Days = history.slice(-7);

  /* ---------------- AI ---------------- */
  const handleAiSend = async () => {
    if (!aiInput.trim()) return;
     userHasChattedRef.current = true; 
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

      setAiMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text:
            data.reply ||
            "I’m here with you 💜 Take your time, I’m listening.",
        },
      ]);
    } catch {
      setAiMessages((prev) => [
        ...prev,
        { sender: "ai", text: "I couldn’t reply just now 😔 but I’m still here." },
      ]);
    }
  };

  return (
    <PageWithSidebar>
    <div className="px-6 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Mental Health Tracker 💜
      </h1>

      {/* GREETING CARDS (UNCHANGED FROM LAST TIME) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-2">
            You’re not alone 💜
          </h3>
          <p className="opacity-90">
            Every emotion you feel is valid. This space is for honesty, not perfection.
          </p>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-8 rounded-3xl">
          <h3 className="text-2xl font-semibold mb-2">
            Healing takes time 🌱
          </h3>
          <p className="opacity-90">
            Small steps still count. You’re showing up — that matters.
          </p>
        </div>
      </div>

      {/* MOOD INPUT */}
      <h2 className="font-semibold mb-3">How are you feeling today?</h2>
      <div className="flex gap-4 mb-8">
        {moodEmojis.map((m) => (
          <button
            key={m.value}
            onClick={() => handleMoodSelect(m)}
            className={`text-3xl p-4 rounded-2xl ${
              selectedMood === m.value
                ? "bg-purple-200"
                : "bg-white hover:bg-purple-100"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* WEEKLY MOOD REVIEW — BAR GRAPH (RESTORED) */}
      <div className="bg-white p-6 rounded-3xl shadow mb-8">
        <h3 className="font-semibold mb-4">Weekly Mood Review</h3>

        {last7Days.length === 0 ? (
          <p className="text-gray-500">No mood data yet</p>
        ) : (
          <div className="flex items-end gap-4 h-56">
            {last7Days.map((e, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-full rounded-xl ${e.color}`}
                  style={{ height: `${e.mood * 18 + 20}px` }}
                ></div>
                <span className="text-xs mt-2 text-gray-500">
                  {e.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
            <PanicBreathing />

      {/* STRESS SCORE — FIXED */}
      <div className="bg-white p-6 rounded-3xl shadow mb-8">
        <h3 className="font-semibold mb-2">Stress / Anxiety Level</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-purple-600 h-4 rounded-full"
            style={{ width: `${stressScore}%` }}
          ></div>
        </div>
        <p className="mt-2">{stressScore}%</p>
      </div>

      {/* AI CHAT */}
      <div className="bg-white p-6 rounded-3xl shadow">
        <h3 className="font-semibold mb-3">AI Mental Health Companion 🤍</h3>

        <div className="max-h-96 overflow-y-auto flex flex-col gap-2 mb-3">
          <AnimatePresence>
            {aiMessages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl max-w-xs ${
                  m.sender === "user"
                    ? "self-end bg-purple-600 text-white"
                    : "self-start bg-gray-200"
                }`}
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={aiEndRef} />
        </div>

        <div className="flex gap-2">
          <input
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
            className="flex-1 border rounded-xl p-2"
            placeholder="Talk to me… 💭"
          />
          <button
            onClick={handleAiSend}
            className="bg-purple-600 text-white px-4 rounded-xl"
          >
            Send
          </button>
        </div>
      </div>
    </div>
     </PageWithSidebar>
  );
}
