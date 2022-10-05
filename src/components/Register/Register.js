import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login/Login.css"


const Register = (props) => {
  const { username, setUsername, password, setPassword } = props
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    await fetch(`/api/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          username: username,
          password: password,
          name: name,
          email: email,
          address: address,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        console.log("this is the data", username, password, name, email, address)
      })
      .catch(console.error);

    navigate("/login");
  };

  return (
    <div className="main-reg" id="login-box">
      <main className="form-signin w-100 m-auto">
          <form onSubmit={submit}>
          <h1 id="reg-header" className="h3 mb-3 fw-normal">
            Register Account
          </h1>
          <div className="form-floating">
          <label htmlFor="floatingInput" className="label">Username</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput" className="label">Name</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput" className="label">Email</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput" className="label">Address</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput" className="label">Password</label>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button
            id="register-button"
            className="w-100 btn btn-lg btn-primary"
            type="submit"
          >
            Register
          </button>
        </form>
      </main>
    </div>
  );
};
export default Register;