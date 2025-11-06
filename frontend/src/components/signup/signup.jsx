import "./signup.css";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const history = useNavigate();
  const [userId, setUserId] = useState(sessionStorage.getItem("Id"));
    if (userId) {
      window.location.href = "/todo";
    }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${window.location.origin}/signup`, form);

      if(res.data.message=="User created successfully"){
        setMessage("✅ Signup successful! You can now sign in.");
        alert(res.data.message);
        
      }else{
          alert(res.data.message);
          setForm({ email: "", username: "", password: "" });
          history("/signin");
      }

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
        setMessage("❌ " + (err.response.data.error || "Signup failed"));
      } else {
        setMessage("❌ Server error, please try again later.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="glow-bg"></div>
      <form className="signup-box" onSubmit={handleSubmit}>
        <h2>📝 Create Your Todo Maker Account</h2>

        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        {message && <p className="signup-message">{message}</p>}

        <p className="switch-link">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};


