import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirect after login


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage(""); // clear previous messages

  try {
    const res = await axios.post("http://localhost:5001/api/auth/login", {
      email,
      password,
    });

    if (res.data && res.data.message) {
      setMessage(res.data.message); // e.g., "Login successful"
      // Optional: store token/session
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));
      // Redirect to home or dashboard
      // navigate("/"); 
    }
  } catch (err) {
    console.error(err);
    setMessage("Login failed. Check email/password.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Login
        </button>
        {message && (
  <p className="text-center mt-4 text-sm text-red-500">{message}</p>
)}

      </form>
    </div>
  );
}
