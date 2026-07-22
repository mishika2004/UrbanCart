import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../config/api";
import "./ChatWidget.css";

const RecommendChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hey! 🛍️ I'm your shopping assistant. Tell me what you're looking for — I'll help you find the perfect product!",
      products: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text, products: [] };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      // Send messages except the last user message, so the backend doesn't duplicate it.
      const conversationHistory = messages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch(apiUrl("/api/ai/recommend-chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          conversationHistory: conversationHistory.slice(-8),
        }),
      });

      const data = await res.json();
      const reply = data?.data?.reply || "Sorry, something went wrong.";
      const products = data?.data?.products || [];
      setMessages((prev) => [...prev, { role: "assistant", content: reply, products }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I couldn't connect. Please try again.", products: [] },
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
        id="recommend-chat-fab"
        className="chat-fab chat-fab--recommend"
        onClick={() => setOpen((o) => !o)}
        title="Need help choosing?"
      >
        {open ? "✕" : "✨"}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel chat-panel--recommend" id="recommend-chat-panel">
          <div className="chat-panel__header chat-panel__header--recommend">
            <span>✨ Shopping Assistant</span>
            <button className="chat-panel__close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chat-panel__messages">
            {messages.map((msg, i) => (
              <div key={i}>
                <div className={`chat-msg chat-msg--${msg.role}`}>
                  {msg.content}
                </div>
                {/* Product cards for assistant messages */}
                {msg.role === "assistant" && msg.products?.length > 0 && (
                  <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
                    {msg.products.map((p) => (
                      <div
                        key={p._id}
                        className="chat-product-card"
                        onClick={() => { navigate(`/product/${p._id}`); setOpen(false); }}
                      >
                        <img src={p.image} alt={p.name} />
                        <div className="chat-product-card__info">
                          <div className="chat-product-card__name">{p.name}</div>
                          <div className="chat-product-card__meta">₹{p.price} · ⭐{p.rating} · {p.category}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
              placeholder="E.g. comfortable shoes under ₹2000…"
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

export default RecommendChatWidget;
