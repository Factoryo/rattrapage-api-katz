import React, { useState } from "react";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    fetch("http://localhost:3001/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid username or password.");
      } else if (!response.ok) {
        throw new Error("Login request failed. Please try again.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Received response:", data);

      if(data.token) {
        setIsAuth(true);
      } else {
        alert(data.message || "Login failed!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error.message);
    });
  };

  return (
    <div className="login">
      <label> Login</label>
      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button onClick={login}> Login</button>
    </div>
  );
}

export default Login;
