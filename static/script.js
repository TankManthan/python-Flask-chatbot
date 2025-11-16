// ===============================
// ENTER TO SEND
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("user_input");

    inputBox.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
});

// ===============================
// TIMEOUT WRAPPER (15s default)
// ===============================
function fetchWithTimeout(url, options, timeout = 15000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), timeout)
        )
    ]);
}

// ===============================
// SEND MESSAGE
// ===============================
async function sendMessage() {
    const input = document.getElementById("user_input");
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    input.value = "";
    input.style.height = "auto";

    // SHOW TYPING
    const id = "typing-" + Date.now();
    appendTyping(id);

    let data;

    try {
        const res = await fetchWithTimeout("/get", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: "msg=" + encodeURIComponent(text)
        });

        data = await res.json();

    } catch (error) {
        removeTyping(id);

        if (error.message === "timeout") {
            appendMessage("⏳ I'm thinking… The server is taking longer than expected.", "bot");
        } else {
            appendMessage("⚠️ Something went wrong. Please try again.", "bot");
        }
        return;
    }

    removeTyping(id);
    appendMessage(data.response, "bot");
}

// ===============================
// ADD MESSAGE BUBBLE
// ===============================
function appendMessage(text, sender) {
    const msgBox = document.getElementById("messages");
    msgBox.innerHTML += `
        <div class="msg ${sender}">
            <div class="bubble">${text}</div>
        </div>
    `;
    msgBox.scrollTop = msgBox.scrollHeight;
}

// ===============================
// CHATGPT TYPING ANIMATION
// ===============================
function appendTyping(id) {
    const msgBox = document.getElementById("messages");

    msgBox.innerHTML += `
        <div class="msg bot typing-bubble" id="${id}">
            <div class="bubble">
                <div class="typing-dots">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    msgBox.scrollTop = msgBox.scrollHeight;
}

function removeTyping(id) {
    const bubble = document.getElementById(id);
    if (bubble) bubble.remove();
}

// ===============================
// DARK MODE TOGGLE
// ===============================
document.getElementById("darkToggle").addEventListener("change", function () {
    document.body.classList.toggle("dark-mode");
});

// ===============================
// EXPORT CHAT
// ===============================
function exportChat() {
    const text = document.getElementById("messages").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "chat_export.txt";
    a.click();
}

// ===============================
// CLEAR CHAT
// ===============================
function clearChat() {
    document.getElementById("messages").innerHTML = "";
}

// ===============================
// AUTO-EXPAND TEXTAREA LIKE CHATGPT
// ===============================
const textarea = document.getElementById("user_input");

textarea.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
});
