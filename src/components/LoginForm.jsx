import { useState } from "react";

const LoginForm = ({
  idInstance,
  apiTokenInstance,
  setIdInstance,
  setApiTokenInstance,
  setIsLoggedIn,
  checkInstanceAuth,
}) => {
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Сброс ошибки перед проверкой

    if (!idInstance || !apiTokenInstance) {
      setError("Введите ID Instance и API Token");
      return;
    }

    const state = await checkInstanceAuth(idInstance, apiTokenInstance);

    if (state === "authorized") {
      setIsLoggedIn(true);
    } else {
      setError("Неверные данные. Проверьте ID Instance и API Token.");
    }
  };

  return (
    <div className="auth-card">
      <h1 className="auth-title">WhatsApp Login</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <input
          type="text"
          placeholder="ID Instance"
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="API Token Instance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          className="auth-input"
        />
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Показываем ошибку */}
        <button type="submit" className="auth-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
