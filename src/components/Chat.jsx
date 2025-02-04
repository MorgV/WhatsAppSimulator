// components/Chat.js
import { useState } from "react";

const Chat = ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
  messages,
  setMessages,
  sendMessage,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && !isSending) {
      setIsSending(true);
      try {
        await sendMessage(
          idInstance,
          apiTokenInstance,
          phoneNumber,
          newMessage
        );
        setMessages((prev) => [...prev, { text: newMessage, sender: "me" }]);
        setNewMessage("");
      } catch (error) {
        console.error("Ошибка отправки сообщения:", error);
      } finally {
        setIsSending(false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Чат с {phoneNumber}</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "me" ? "sent" : "received"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          className="chat-input"
          placeholder="Введите сообщение..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button" disabled={isSending}>
          {isSending ? "Отправка..." : "Отправить"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
