import React, { useState } from "react";
import axios from "axios";
import "./Register.css"; 


function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message avant chaque submit
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/register", form);
      setMessage("✅ Inscription réussie, vous pouvez vous connecter !");
      console.log(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage("❌ " + err.response.data.message);
        console.error(err.response.data);
      } else {
        setMessage("❌ Erreur serveur");
      }
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-card">
        <h2>Créer un compte</h2>

        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirmez le mot de passe"
          value={form.password_confirmation}
          onChange={handleChange}
        />

        <button type="submit" className="btn-submit">
          S'inscrire
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default Register;
