import { Routes, Route } from "react-router-dom";
import MentalHealth from "./pages/MentalHealth";
import Navbar from "./components/Navbar"; // 👈 adjust path if needed
import Home from "./pages/Home";
import FindDoctor from "./pages/FindDoctor";
import SymptomChecker from "./pages/SymptomChecker";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}



