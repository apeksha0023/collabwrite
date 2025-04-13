import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation to ensure both fields are filled
    if (!form.email || !form.password) {
      setError("Please fill in both fields");
      return;
    }

    try {
      const res = await loginUser(form);

      if (res?.token) {
        login(res); // Assuming login sets the token in context or localStorage
        setForm({ email: "", password: "" }); // Reset the form on successful login
        navigate("/"); // Redirect to home or dashboard
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>

      {/* Display error message if any */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;