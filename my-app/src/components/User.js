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
      <div className="whole">
        <div className="headers">
          <h1 className="header">SURVEY FORM</h1>
        </div>
        <div className="sub">
          <div className="side-line">Mobile number</div>
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
          <button onClick={addtask} className="otp-btn">
            Send OTP
          </button>
        </div>
        <div className="gender-head">Gender : </div>
        <div className="gender">
          <input
            type="checkbox"
            className="input-task"
            placeholder="Enter OTP"
          />
          <div>Male</div>
        </div>
        <div className="gender">
          <input
            type="checkbox"
            className="input-task"
            placeholder="Enter OTP"
          />
          <div>Female</div>
        </div>
        <div className="gender-head">
          PC :
          <input type="text" className="PC-box" />
        </div>
        <div className="gender-head">
          AC :
          <input type="text" className="PC-box" />
        </div>
        <div className="gender-head"> More details</div>
        <div className="gender-head"> More details</div>
        <div className="gender-head"> More details</div>
      </div>
    </div>
  );
};
