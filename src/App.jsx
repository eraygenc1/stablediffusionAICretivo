import { useState } from "react";
import logo from "./assets/cretivo-logo-white.png";

export default function App() {
  const [prompt, setPrompt] = useState("29 Ekim Cumhuriyet Bayramı");
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const generate = async () => {
    setLoading(true);
    setImg(null);

    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      console.log("Yanıt:", data);

      if (data.image) {
        setImg(`data:image/png;base64,${data.image}`);
      } else {
        alert("Görsel alınamadı, API yanıtını konsolda kontrol et.");
      }
    } catch (err) {
      console.error("Hata:", err);
      alert("Bir hata oluştu!");
    }

    setLoading(false);
  };

  return (
    <div className="containers"
      style={{
        fontFamily: "sans-serif",
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
     
      <img
        src={logo}
        alt="Cretivo AI Logo"
        style={{
          width: "200px",
          marginBottom: "20px",
          filter: "drop-shadow(0 0 10px rgba(255,255,255,0.2))",
        }}
      />

      <h1>🧠 Cretivo AI</h1>
    

      
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{
          display: "block",
          margin: "1rem auto",
          width: "80%",
          maxWidth: "600px",
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          resize: "none",
          fontSize: "1rem",
          outline: "none",
        }}
        placeholder="örnek: a cyberpunk cat sitting on a neon roof"
      />

      
      <button
        onClick={generate}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          background: loading ? "#475569" : "#6366f1",
          color: "white",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        {loading ? "Oluşturuluyor..." : "🎨 Görsel Üret"}
      </button>

      
      {img && (
        <div style={{ marginTop: "30px" }}>
          <img
            src={img}
            alt="AI generated"
            style={{
              width: "512px",
              maxWidth: "90%",
              borderRadius: "12px",
              boxShadow: "0 0 25px rgba(0,0,0,0.4)",
              marginBottom: "2rem",
            }}
          />
        </div>
      )}
    </div>
  );
}
