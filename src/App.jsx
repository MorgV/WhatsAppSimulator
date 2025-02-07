// App.js
import { useState, useEffect } from "react";
import "./assets/AppStyles.css";
import LoginForm from "./components/LoginForm";
import CreateChat from "./components/CreateChat";
import Chat from "./components/Chat";
import {
  sendMessage,
  receiveNotification,
  deleteNotification,
  checkInstanceAuth,
} from "./api/api";

const App = () => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isLoggedIn && chatStarted) {
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, chatStarted]);

  const fetchMessages = async () => {
    try {
      const data = await receiveNotification(idInstance, apiTokenInstance);

      if (!data || !data.body) return;

      if (data.body.typeWebhook === "incomingMessageReceived") {
        const textMessage = data.body.messageData?.textMessageData?.textMessage;
        const messageId = data.body.idMessage; // ID сообщения

        // Теперь все входящие сообщения добавляются в список
        if (textMessage) {
          setMessages((prev) => [
            ...prev,
            { id: messageId, text: textMessage, sender: "them" },
          ]);
        }
      }

      if (data.receiptId) {
        await deleteNotification(idInstance, apiTokenInstance, data.receiptId);
      }
    } catch (error) {
      console.error("Ошибка получения сообщения:", error);
    }
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <LoginForm
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          setIdInstance={setIdInstance}
          setApiTokenInstance={setApiTokenInstance}
          setIsLoggedIn={setIsLoggedIn}
          checkInstanceAuth={checkInstanceAuth}
        />
      ) : !chatStarted ? (
        <CreateChat
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          setChatStarted={setChatStarted}
        />
      ) : (
        <Chat
          idInstance={idInstance}
          apiTokenInstance={apiTokenInstance}
          phoneNumber={phoneNumber}
          messages={messages}
          setMessages={setMessages}
          sendMessage={sendMessage}
        />
      )}
    </div>
  );
};

export default App;
