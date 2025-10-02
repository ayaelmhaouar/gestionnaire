import { useState } from "react";
import API from "../api/api";
import "./Login.css";


export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      setToken(token);
      setMessage("Connexion réussie !");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Impossible de se connecter"));
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Se connecter</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}
