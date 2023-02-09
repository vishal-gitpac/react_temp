import { useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import img from "./18891613_1693623057317945_3168262290184170435_o.jpeg";
//import { createBrowserHistory } from "history";
//react elements should be declare with capital letter in the starting
//import data from "./data";
import { Faq } from "./components/Faq";
import { RqFaq } from "./components/RQFaq";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import { User } from "./components/User";

//import { Navbar } from "./navbar";
let cnt = 1;
function App() {
  //const token = match.params.token;
  //let loc = "/user" + token;
  //console.log(token);
  //const [jwtToken, setJwtToken] = useState(null);
  //setJwtToken(token);
  const [todo, settodo] = useState([{ sub: "maths", id: 0 }]);
  const [task, settask] = useState("");
  function addtask() {
    settodo((oldtodo) => {
      //runs synchronously so task does not become empty before adding to todo
      settask("");
      return [...oldtodo, { sub: task, id: cnt++ }];
    });
    //...includes all old elements of oldtodo
    //whenever the new otuput depends on input it is better to use function as value
  }
  function deltask(pa) {
    const newtodo = todo.filter((b) => b.id !== pa);
    settodo(newtodo);
    //settodo(oldtodo=>oldtodo.filter((b)=>b.id!==pa)) is not working it is deleting the whole list
    //.. so a new array is assigned and then set
  }
  function addwhenenter(e) {
    if (e.keyCode === 13) {
      addtask();
    }
  }
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const history = createBrowserHistory();
  return (
    <div>
      <BrowserRouter>
        <div className="comp">
          <Routes>
            <Route
              path="/"
              exact
              element={
                <div>
                  <div className="header2">
                    <div className="header1">TDP SURVEY</div>
                    <div>
                      <Link to="/login">
                        <button className="login">login</button>
                      </Link>
                      <Link to="/signup">
                        <button className="login">signup</button>
                      </Link>
                    </div>
                  </div>
                  <div className="background"></div>
                  <img src={img} width="1500" height="800" />
                </div>
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/login"
              element={
                <div>
                  <Login />
                </div>
              }
              exact
            />
            <Route
              path="/signup"
              element={
                <div>
                  <Signup />
                </div>
              }
              exact
            />
            <Route
              path={"/user/:token"}
              element={
                <div>
                  <User />
                </div>
              }
              exact
            />
          </Routes>
          <div className="footer">
            <p>About website , </p>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
