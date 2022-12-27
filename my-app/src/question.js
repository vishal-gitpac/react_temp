import React, { useState } from "react";
const Question = (props) => {
  const { title, info } = props;
  const [visbl, setvisbl] = useState(0);
  function visible() {
    visbl ? setvisbl(0) : setvisbl(1);
  }
  return (
    <div className="faq-container">
      <div className="question">
        <h3>{title}</h3>
        {!visbl ? (
          <button className="toggle" onClick={visible}>
            +
          </button>
        ) : (
          <button className="toggle" onClick={visible}>
            -
          </button>
        )}
      </div>
      {visbl ? (
        <div className="answer">
          <h4>{info}</h4>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Question;
