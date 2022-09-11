import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const { setIsLoggedIn } = props
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    await fetch(`/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: username,
          password: password,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        console.log("token", result.token)
      })
      .catch(console.error);

    navigate("/products");
  };
  return (
    <div className="main-login">
      <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
          <h1 id="login-header" className="h3 mb-3 fw-normal">
            Login To Account
          </h1>
          <div className="form-floating">
          <label htmlFor="floatingInput">Username</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            id="submit-button"
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;