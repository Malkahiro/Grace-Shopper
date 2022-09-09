import React from 'react'
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { APIURL } from "../api/api";

const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const submit = async (event) => {
//     event.preventDefault();
//     await fetch(`${APIURL}users/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         user: {
//           username: username,
//           password: password,
//         },
//       }),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         console.log(result);
//       })
//       .catch(console.error);

//     navigate("/login");
//   };

  return (
    <div className="main-reg">
      <main className="form-signin w-100 m-auto">
          {/* //ADD THIS CODE BACK IN!!!!!!  <form onSubmit={submit}></form> */}
        <form>
          <h1 id="reg-header" className="h3 mb-3 fw-normal">
            Register Account
          </h1>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="username"
            //   onChange={(event) => setUsername(event.target.value)}
            />
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            //   onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
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