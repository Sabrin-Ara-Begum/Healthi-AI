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

  const features = [
    {
      title: "Symptom Checker",
      icon: <HeartPulse size={32} />,
      desc: "AI-based disease insights",
      action: () => navigate("/symptom-checker"),
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

  return (
    <div className="px-8 py-10">
      {/* HERO */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-10 text-white mb-14">
        <h2 className="text-4xl font-bold mb-4">
          Your Personal AI Health Assistant
        </h2>
        <p className="text-lg max-w-2xl opacity-90">
          Smart healthcare guidance powered by AI.
        </p>
        {/* ❌ AI INPUT REMOVED FROM HOME (INTENTIONAL) */}
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
            <h4 className="font-semibold text-gray-800 mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
