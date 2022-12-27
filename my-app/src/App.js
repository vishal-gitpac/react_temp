import { useState } from "react";
import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
//react elements should be declare with capital letter in the starting
//import data from "./data";
import { Faq } from "./components/Faq";
import { RqFaq } from "./components/RQFaq";
//import { Navbar } from "./navbar";
let cnt = 1;
function App() {
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
  return (
    <div>
      <div className="header1">my portfolio</div>
      <div className="comp">
        <BrowserRouter>
          <Link to="/">Home</Link>
          <Routes>
            <Route
              path="/"
              element={
                <div className="whole">
                  <div className="headers">
                    <h1 className="header">TO DO LIST</h1>
                  </div>
                  <input
                    onKeyDown={addwhenenter}
                    type="text"
                    //value attribute of input tag in react works only with usestate or else they stay static with defaulot value given
                    value={task}
                    onChange={(event) => {
                      settask(event.target.value);
                    }}
                    className="input-task"
                  />
                  <button onClick={addtask}>add</button>
                  <div className="todo-cont">
                    <ul className="list">
                      {todo
                        ? todo.map((dt) => {
                            return (
                              <div className="todo-container" key={dt.id}>
                                <div className="todo">
                                  <div className="task">
                                    <input type="checkbox" />
                                    {dt.sub}
                                  </div>
                                  <button
                                    onClick={() => deltask(dt.id)}
                                    className="rm-btn"
                                  >
                                    remove
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        : "loading"}
                    </ul>
                  </div>
                </div>
              }
            />
          </Routes>
          <div className="FAQ">
            <Link to="/faq">
              <h1>FAQ</h1>
            </Link>
            <Link to="/rqfaq">
              <h1>RQFAQ</h1>
            </Link>
            <Routes>
              <Route
                path="/faq"
                element={
                  // {data.map((ar) => {
                  //     return <Ques title={ar.title} key={ar.id} info={ar.info} />;
                  //   })}
                  <div>
                    <Faq />
                  </div>
                }
                exact
              />
              <Route
                path="/rqfaq"
                element={
                  // {data.map((ar) => {
                  //     return <Ques title={ar.title} key={ar.id} info={ar.info} />;
                  //   })}
                  <div>
                    <RqFaq />
                  </div>
                }
                exact
              />
            </Routes>
          </div>
        </BrowserRouter>
        <div className="footer">
          <p>About me , </p>I am Vishal, studying at iiitdm kancheepuram
        </div>
      </div>
    </div>
  );
}
export default App;
