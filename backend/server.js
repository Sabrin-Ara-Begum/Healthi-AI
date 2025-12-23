import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.post("/api/openrouter/chat", async (req, res) => {
  try {
    const { message } = req.body

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5174",
        "X-Title": "Healthi AI",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    })

    const data = await response.json()

    res.json({
      reply: data.choices[0].message.content,
    })
  } catch (error) {
    console.error("OpenRouter Error:", error)
    res.status(500).json({ error: "OpenRouter API failed" })
  }
})

app.listen(5001, () => {
  console.log("Backend running on port 5001")
})
