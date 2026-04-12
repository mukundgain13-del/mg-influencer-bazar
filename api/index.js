export default async function handler(req, res) {
    // अगर कोई सिर्फ पेज खोलता है तो उसे "Server OK" दिखेगा
    if (req.method !== 'POST') {
        return res.status(200).send("Server is running perfectly!");
    }

    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY; // पक्का करें कि Vercel में यही नाम हो

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        // AI का जवाब निकाल रहे हैं
        const aiReply = data.candidates[0].content.parts[0].text;

        // आपकी वेबसाइट को सही फॉर्मेट में जवाब भेज रहे हैं
        res.status(200).json({
            candidates: [{
                content: { parts: [{ text: aiReply }] }
            }]
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}
