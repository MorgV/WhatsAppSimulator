// components/LoginForm.js
const LoginForm = ({
  idInstance,
  apiTokenInstance,
  setIdInstance,
  setApiTokenInstance,
  setIsLoggedIn,
}) => {
  const handleLogin = (e) => {
    e.preventDefault();
    if (idInstance && apiTokenInstance) setIsLoggedIn(true);
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
        <button type="submit" className="auth-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
