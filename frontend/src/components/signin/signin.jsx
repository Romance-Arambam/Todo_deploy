import "./signin.css";
import React, { use, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";


export default function Signin(){

    const [form, setForm] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState(sessionStorage.getItem("Id"));
    if (userId) {
      window.location.href = "/todo";
    }

    const history = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       await axios.post(`${window.location.origin}/signin`, form).then( (res) => {
          sessionStorage.setItem("Id", res.data.others._id);
          dispatch(authActions.login());

          history('/todo');
       });

    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
        setMessage("❌ " + (err.response.data.error || "Signin failed"));
      } else {
        setMessage("❌ Server error, please try again later.");
      }
    }
  };

    return(
        <div className="signin-page">
      <div className="glow-bg"></div>
      <form className="signin-box " onSubmit={handleSubmit}> 
        <h2>🎬 Welcome Back to Todo Maker</h2>
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
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">🔓 Log In</button>
        {message && <p className="login-message">{message}</p>}
      </form>
    </div>
    )
}