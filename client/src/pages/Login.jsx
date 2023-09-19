import { useState } from "react";
import "../App.css"
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4001/login', {
        Username,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        navigate('/');
      } else {
        setError("Login failed.");
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <form className="login" onSubmit={login} >
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;