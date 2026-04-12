export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(200).send("Server OK");
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY; 

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
        });

        const data = await response.json();
        const aiReply = data.candidates[0].content.parts[0].text;

        res.status(200).json({ candidates: [{ content: { parts: [{ text: aiReply }] } }] });
    } catch (e) { 
        res.status(500).json({ error: "API Connection Failed" }); 
    }
}
