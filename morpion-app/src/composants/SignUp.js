import React, { useState } from "react";

function SignUp({ setIsAuth }) {
  const [user, setUser] = useState({});

  const signUp = () => {
    fetch("http://localhost:3001/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Sign up failed");
      }
    })
    .then((data) => {
      if(data.token) {
        setIsAuth(data.userId);
      } else {
        alert(data.message || "Sign up failed!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="signUp">
      <label> Sign Up</label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />
      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />
      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />
      <button onClick={signUp}> Sign Up</button>
    </div>
  );
}

export default SignUp;
