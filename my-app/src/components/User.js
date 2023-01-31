import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

let cnt = 1;
export const User = () => {
  const [todo, settodo] = useState([{ completed: false, sub: "maths", id: 0 }]);
  const [task, settask] = useState("");
  function addtask() {
    settodo((oldtodo) => {
      //runs synchronously so task does not become empty before adding to todo
      settask("");
      return [...oldtodo, { completed: false, sub: task, id: cnt++ }];
    });
    //...includes all old elements of oldtodo
    //whenever the new otuput depends on input it is better to use function as value
  }
  function updatetask(pa) {
    const newtodo = todo.map((b) => {
      if (b.id === pa) {
        return { ...b, completed: !b.completed };
      }
      return b;
    });
    settodo(newtodo);
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
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .get("http://localhost:5000/logout/")
      //res is converted to res.json
      .then((res) => {
        localStorage.removeItem("token");
        console.log(res);
        setIsLoggedOut(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const SaveList = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    await axios
      .post(
        "http://localhost:5000/todos/save/",
        {
          todolist: todo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    //console.log(token);
    axios
      .get("http://localhost:5000/auth/" + token, {
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
    axios
      .get("http://localhost:5000/todos/get/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        settodo(res.data);
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
          {isLoggedOut ? (
            <Navigate to="/" />
          ) : (
            <button className="lgt-btn" onClick={handleSubmit}>
              logout
            </button>
          )}
        </div>
      </div>
      <div className="comp">
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
                            <input
                              onChange={() => updatetask(dt.id)}
                              type="checkbox"
                              checked={dt.completed}
                            />
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
            <button onClick={SaveList} className="save-btn">
              save
            </button>
          </div>
        </div>
        {/*<div className="FAQ">
          <Link to="/faq">
            <h1>FAQ</h1>
          </Link>
          <Link to="/rqfaq">
            <h1>RQFAQ</h1>
          </Link>
        </div>
        <div className="footer">
          <p>About me , </p>I am Vishal, studying at iiitdm kancheepuram
        </div>*/}
      </div>
    </div>
  );
};
