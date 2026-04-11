export default async function handler(req, res) {
    // सुरक्षा के लिए हेडर्स
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { message } = req.body;
            // यहाँ आपकी चाबी काम करेगी (Vercel Settings में GOOGLE_API_KEY नाम से सेव करें)
            const apiKey = process.env.GOOGLE_API_KEY;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: "You are a combined AI of Google and Meta. Help with viral YouTube scripts, images, and video prompts: " + message }] }]
                })
            });

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "सर्वर में गड़बड़ है" });
        }
    }
}
