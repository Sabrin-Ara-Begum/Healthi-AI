import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Stethoscope,
  Pill,
  Brain,
  Baby,
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();
  const [aiInput, setAiInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const features = [
    {
      title: "Symptom Checker",
      icon: <HeartPulse size={32} />,
      desc: "AI-based disease insights",
    },
    {
      title: "Find Doctors",
      icon: <Stethoscope size={32} />,
      desc: "Search nearby specialists",
      action: () => navigate("/find-doctor"),
    },
    {
      title: "Tablet Identifier",
      icon: <Pill size={32} />,
      desc: "Know medicine usage",
    },
    {
      title: "Mental Health",
      icon: <Brain size={32} />,
      desc: "Mood tracking & AI chat",
    },
    {
      title: "Pregnancy Care",
      icon: <Baby size={32} />,
      desc: "Care guidance for mothers",
    },
  ];

  const sendMessage = async () => {
    if (!aiInput.trim()) return;
    try {
      const res = await fetch("http://localhost:5001/api/openrouter/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiInput }),
      });

      if (!res.ok) throw new Error("OpenRouter API request failed!");

      const data = await res.json();
      setAiResponse(data.reply);
    } catch (err) {
      console.error("OpenRouter API request failed!", err);
      setAiResponse("Error: Unable to get response from AI.");
    }
  };

  return (
    <div className="px-8 py-10">
      {/* HERO */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-10 text-white mb-14">
        <h2 className="text-4xl font-bold mb-4">
          Your Personal AI Health Assistant
        </h2>
        <p className="text-lg max-w-2xl mb-6 opacity-90">
          Smart healthcare guidance powered by AI.
        </p>

        {/* AI Chat Input */}
        <div className="flex gap-2 mt-6">
          <input
            type="text"
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="Ask me about your symptoms..."
            className="flex-1 p-3 rounded-l-2xl border border-gray-300 focus:outline-none text-black"
          />
          <button
            onClick={sendMessage}
            className="bg-white text-purple-600 px-6 rounded-r-2xl font-semibold hover:bg-gray-100 transition"
          >
            Talk
          </button>
        </div>

        {aiResponse && (
          <div className="mt-4 p-4 bg-white text-gray-800 rounded-2xl shadow-md">
            {aiResponse}
          </div>
        )}
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {features.map((item, index) => (
          <div
            key={index}
            onClick={item.action}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition cursor-pointer"
          >
            <div className="text-purple-600 mb-4 flex justify-center">
              {item.icon}
            </div>
            <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
