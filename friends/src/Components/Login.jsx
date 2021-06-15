import { useState } from "react";
import axios from "axios";

const initialCredentials = {
  username: "Lambda",
  password: "School",
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialCredentials);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
      </form>
    </div>
  );
};

export default Login;