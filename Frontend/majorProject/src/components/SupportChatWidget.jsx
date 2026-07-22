import { useState, useRef, useEffect } from "react";
import { apiUrl } from "../config/api";
import "./ChatWidget.css";

const SupportChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! 👋 I'm UrbanCart's support assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Extract order ID if mentioned (24-char hex)
      const orderMatch = text.match(/[0-9a-f]{24}/i);
      // Send messages except the last user message, so the backend doesn't duplicate it.
      const conversationHistory = messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(apiUrl("/api/ai/support-chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          orderId: orderMatch ? orderMatch[0] : null,
          conversationHistory: conversationHistory.slice(-8),
        }),
      });

      const data = await res.json();
      const reply = data?.data?.reply || "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        id="support-chat-fab"
        className="chat-fab chat-fab--support"
        onClick={() => setOpen((o) => !o)}
        title="Customer Support"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel chat-panel--support" id="support-chat-panel">
          <div className="chat-panel__header chat-panel__header--support">
            <span>🛟 UrbanCart Support</span>
            <button className="chat-panel__close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-panel__messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-typing">
                <div className="chat-typing__dot" />
                <div className="chat-typing__dot" />
                <div className="chat-typing__dot" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chat-panel__input">
            <input
              type="text"
              placeholder="Ask about orders, returns, shipping…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChatWidget;
