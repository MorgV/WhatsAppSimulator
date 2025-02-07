import { checkPhoneNumber } from "../api/api";
import { useState } from "react";

const CreateChat = ({
  idInstance,
  apiTokenInstance,
  phoneNumber,
  setPhoneNumber,
  setChatStarted,
}) => {
  const [error, setError] = useState("");

  const validatePhoneNumber = (number) => {
    return /^\d{10,15}$/.test(number);
  };

  const handleStartChat = async (e) => {
    e.preventDefault();
    setError(""); // Сброс ошибки

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Введите номер в международном формате (без +)");
      return;
    }

    const isValid = await checkPhoneNumber(
      idInstance,
      apiTokenInstance,
      phoneNumber
    );
    if (isValid) {
      setChatStarted(true);
    } else {
      setError("Этот номер не зарегистрирован в WhatsApp.");
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">Создать Чат</h1>
      <form onSubmit={handleStartChat} className="auth-form">
        <input
          type="text"
          placeholder="Номер телефона"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
          className="auth-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="auth-button">
          Создать Чат
        </button>
      </form>
    </div>
  );
};

export default CreateChat;
