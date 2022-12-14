import React from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = (props) => {
    const { setIsLoggedIn, username, setUsername, password, setPassword } = props

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

        console.log("result from login ", result)
        if (result.error) {
          alert(result.error.message)
          throw result.error
        }
        localStorage.setItem("token", result.token);
        setIsLoggedIn(true);
        localStorage.setItem("username", username);
      })
      .catch(console.error);

    navigate("/products");
  };
  return (
    <div className="main-login" id="login-box">
      <main className="form-signin w-100 m-auto">
      <form onSubmit={submit}>
          <h1 id="login-header" className="h3 mb-3 fw-normal">
            Login To Account
          </h1>
          <div className="form-floating">
          <label htmlFor="floatingInput" className="label" id="user-label">Username  </label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingPassword" className="label">Password  </label>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
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