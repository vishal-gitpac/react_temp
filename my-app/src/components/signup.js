import React, { useState } from "react";
import axios from "axios";
//import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Signup = () => {
  const [jwtToken, setJwtToken] = useState(null);
  let token;
  let loc = "/user/" + jwtToken;
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:5000/", {
        username: username,
        password: password,
      })
      //res is converted to res.json
      .then((res) => res.data)
      .then((res) => {
        token = res.token;
        setJwtToken(token);
        console.log(token);
        localStorage.setItem("token", token);
        //history.push("/user");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //useEffect(() => {}, [isRegistered]);
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
            {/*<div>{response}</div>*/}
            <button type="submit" onClick={handleSubmit} className="lgn-btn">
              signup
            </button>
            {jwtToken && <Navigate to={loc} />}
          </form>
        </div>
      </div>
    </div>
  );
};
//can directly use withRouter at beggining so returned it seperately
//export default withRouter(Signup);
