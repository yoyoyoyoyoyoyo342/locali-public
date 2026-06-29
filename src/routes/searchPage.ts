import { Router } from "express"
import Groq from "groq-sdk"

const router = Router()

// Initialize native Groq SDK Client
const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

router.get("/", async (req, res) => {
  try {
    const query = req.query.q as string
    const format = req.query.format as string

    if (!query) {
      return res.send(`
        <html>
          <body style="font-family: sans-serif; padding: 2rem; background: #0a0a0a; color: white;">
            <h1>locali.run search directory</h1>
            <form method="GET" action="/search">
              <input name="q" placeholder="Search..." style="padding: 0.5rem; width: 300px;" />
              <button type="submit" style="padding: 0.5rem;">Search</button>
            </form>
          </body>
        </html>
      `)
    }

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
You are an AI search engine.

Return ONLY valid JSON in this format:
{
  "title": "",
  "summary": "",
  "steps": [
    { "id": "1", "text": "" }
  ]
}
          `
        },
        {
          role: "user",
          content: query
        }
      ],
      temperature: 0.3
    })

    const content = completion.choices?.[0]?.message?.content

    if (!content) {
      return res.send("Error: No response")
    }

    let data

    try {
      data = JSON.parse(content)
    } catch {
      return res.send("Error: Invalid JSON")
    }

    if (format === "json") {
      return res.json(data)
    }

    return res.send(`
      <html>
        <body style="font-family: sans-serif; padding: 2rem; background: #0a0a0a; color: white;">
          <h1>${data.title}</h1>
          <p>${data.summary}</p>

          <h2>Steps</h2>
          <ul>
            ${data.steps.map((s: any) => `<li>${s.text}</li>`).join("")}
          </ul>
        </body>
      </html>
    `)

  } catch {
    return res.send("Search failed")
  }
})

export default router