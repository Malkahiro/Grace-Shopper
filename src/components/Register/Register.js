import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css"


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
    <div className="main-reg">
      <main className="form-signin w-100 m-auto">
          <form onSubmit={submit}>
          <h1 id="reg-header" className="h3 mb-3 fw-normal">
            Register Account
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
          <label htmlFor="floatingInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput">Email</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput">Address</label>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
              onChange={(event) => setAddress(event.target.value)}
            />
          </div>
          <div className="form-floating">
          <label htmlFor="floatingInput">Password</label>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
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