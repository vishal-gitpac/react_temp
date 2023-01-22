import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

let cnt = 1;
export const User = () => {
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
  const [username, setusername] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    axios
      .get("http://localhost:5000/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setusername(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="header2">
        <div className="header1">my portfolio</div>
        <div>
          {username}
          <button>logout</button>
        </div>
      </div>
      <div className="comp">
        <Link to="/">Home</Link>
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
        <div className="FAQ">
          <Link to="/faq">
            <h1>FAQ</h1>
          </Link>
          <Link to="/rqfaq">
            <h1>RQFAQ</h1>
          </Link>
        </div>
        <div className="footer">
          <p>About me , </p>I am Vishal, studying at iiitdm kancheepuram
        </div>
      </div>
    </div>
  );
};
