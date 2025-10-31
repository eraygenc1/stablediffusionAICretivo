// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ CretivoAI Proxy (Stable Diffusion WebUI) Çalışıyor!");
});

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const payload = {
      prompt,
      negative_prompt: "blurry, low quality, watermark, bad anatomy",
      steps: 25,
      width: 512,
      height: 512,
      sampler_index: "Euler a",
      cfg_scale: 7,
      batch_size: 1,
    };

    const response = await fetch("http://127.0.0.1:7860/sdapi/v1/txt2img", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (data.images && data.images.length > 0) {
      res.json({ image: data.images[0] });
    } else {
      console.error("Stable Diffusion boş yanıt döndürdü:", data);
      res.status(500).json({
        error: "Görsel alınamadı — Stable Diffusion boş yanıt döndürdü.",
        details: data,
      });
    }
  } catch (error) {
    console.error("Stable Diffusion API hatası:", error);
    res.status(500).json({ error: "API isteği başarısız oldu." });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy Server aktif: http://localhost:${PORT}`);
});
