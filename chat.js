async function sendMsg() {
    const input = document.getElementById('msg-input');
    const box = document.getElementById('chat');
    const text = input.value.trim();
    if(!text) return;

    box.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    try {
        // यहाँ ध्यान दें: अब हम सीधा अपने बनाए हुए 'chat.js' वाले रास्ते पर जा रहे हैं
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        
        const data = await res.json();
        
        if(data && data.candidates) {
            const reply = data.candidates[0].content.parts[0].text;
            box.innerHTML += `<div class="msg ai">${reply}</div>`;
        } else {
            box.innerHTML += `<div class="msg ai">मुकुंद भाई, गूगल की तरफ से कोई जवाब नहीं आया।</div>`;
        }
    } catch (e) {
        // अगर यहाँ एरर आता है, तो मतलब सर्वर फाइल तक नहीं पहुँच पा रहा
        box.innerHTML += `<div class="msg ai">सर्वर से संपर्क नहीं हो पा रहा है।</div>`;
    }
    box.scrollTop = box.scrollHeight;
}
