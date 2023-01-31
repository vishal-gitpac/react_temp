import React, { useState } from "react";
import axios from "axios";

export const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/login/", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          window.location.href = "/user/" + res.data.token;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //const [response, setResponse] = useState("");
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  return (
    <div>
      <div className="header2">
        <div className="header1">my portfolio</div>
      </div>
      <div className="login-page">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
            <label className="username">
              Username:
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <br />
            <label className="username">
              Password:
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit" onClick={handleSubmit} className="lgn-btn">
              login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
