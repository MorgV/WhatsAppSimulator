// components/CreateChat.js
const CreateChat = ({ phoneNumber, setPhoneNumber, setChatStarted }) => {
    const validatePhoneNumber = (number) => /^[1-9]\d{9,14}$/.test(number);
  
    const handleStartChat = (e) => {
      e.preventDefault();
      if (validatePhoneNumber(phoneNumber)) {
        setChatStarted(true);
      } else {
        alert("Введите правильный номер в международном формате");
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
          <button type="submit" className="auth-butto
  