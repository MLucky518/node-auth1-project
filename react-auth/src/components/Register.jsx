import React, { useState } from "react";

function Register() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          type="text"
          name="username"
          placeholder="Enter your username here"
          onChange={handleInput}
          value={user.username}
        />

        <input
          type="text"
          name="password"
          placeholder="Enter your password here"
          onChange={handleInput}
          value={user.password}
        />
      </form>
    </div>
  );
}

export default Register;
