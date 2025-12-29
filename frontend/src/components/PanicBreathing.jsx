import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const phases = [
  { text: "Inhale", msg: "Breathe in slowly 💙", scale: 1.3 },
  { text: "Hold", msg: "Hold gently 🫶", scale: 1.3 },
  { text: "Exhale", msg: "Breathe out slowly 😮‍💨", scale: 0.9 },
];

export default function PanicBreathing() {
  const [index, setIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phases.length);
    }, 2700);

    return () => clearInterval(interval);
  }, [isRunning]);

  const current = phases[index];

  return (
    <div className="bg-purple-100 p-6 rounded-2xl text-center shadow-md">
      <h2 className="text-xl font-semibold text-purple-700 mb-4">
        Panic Mode Breathing
      </h2>

      {/* Breathing Circle */}
      <div className="flex justify-center mb-4">
        <motion.div
          animate={{ scale: isRunning ? current.scale : 1 }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
          className="w-32 h-32 rounded-full bg-purple-400 flex items-center justify-center"
        >
          <span className="text-white font-semibold">
            {isRunning ? current.text : "Paused"}
          </span>
        </motion.div>
      </div>

      <p className="text-gray-700 mb-4">
        {isRunning ? current.msg : "Click start when you’re ready 💜"}
      </p>

      {/* Start / Stop Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setIsRunning(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
        >
          Start
        </button>

        <button
          onClick={() => setIsRunning(false)}
          className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
        >
          Stop
        </button>
      </div>
    </div>
  );
}
