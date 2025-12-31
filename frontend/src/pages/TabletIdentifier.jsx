import { useState, useRef } from "react";

export default function TabletIdentifier() {
  const [tablet, setTablet] = useState("");
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSearch = () => {
    if (!tablet.trim()) return;

    const data = {
      "dolo 650": {
        use: "Used to reduce fever and relieve mild to moderate pain.",
        dosage: "1 tablet every 6–8 hours. Max 4/day.",
        warning: "Avoid alcohol. Overdose can damage liver.",
      },
      "paracetamol": {
        use: "Pain relief and fever reducer.",
        dosage: "500–650 mg every 6–8 hours.",
        warning: "Do not exceed recommended dose.",
      },
    };

    const key = tablet.toLowerCase();
    setResult(
      data[key] || {
        use: "Tablet not found.",
        dosage: "N/A",
        warning: "Please consult a doctor or pharmacist.",
      }
    );
  };

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageCapture = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(URL.createObjectURL(file));

    // TEMP: simulate name detection
    // Later this will be AI Vision
    setTablet("Dolo 650");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
          Tablet Identifier
        </h2>

        {/* Camera Upload */}
        <button
          onClick={handleCameraClick}
          className="w-full mb-4 bg-gray-200 py-3 rounded-xl hover:bg-gray-300"
        >
          📷 Scan Tablet using Camera
        </button>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          ref={fileInputRef}
          onChange={handleImageCapture}
          className="hidden"
        />

        {image && (
          <img
            src={image}
            alt="Tablet Preview"
            className="mb-4 rounded-xl"
          />
        )}

        {/* Manual / Detected Name */}
        <input
          type="text"
          placeholder="Tablet name"
          value={tablet}
          onChange={(e) => setTablet(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl"
        />

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
        >
          Identify Tablet
        </button>

        {result && (
          <div className="mt-6 bg-blue-100 p-4 rounded-xl">
            <p><strong>Use:</strong> {result.use}</p>
            <p className="mt-2"><strong>Dosage:</strong> {result.dosage}</p>
            <p className="mt-2 text-red-600">
              <strong>Warning:</strong> {result.warning}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
