import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // 👈 adjust path if needed
import Home from "./pages/Home";
import FindDoctor from "./pages/FindDoctor";
import SymptomChecker from "./pages/SymptomChecker";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      {/* PAGE CONTENT */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctor" element={<FindDoctor />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
      </Routes>
    </div>
  );
}



