import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Ques from "../question";
export const Faq = () => {
  const [Loading, SetLoading] = useState(true);
  const [data, Setdata] = useState([]);

  useEffect(() => {
    fetchQ();
  }, []);

  const fetchQ = async () => {
    const text = await fetch("/api/Faq");
    if (!text.ok) {
      throw new Error(text.statusText);
    }
    const data = await text.json();
    Setdata(data);
    SetLoading(false);
  };
  if (Loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <div className="header2">
        <div className="header1">my portfolio</div>
      </div>
      <div className="FAQ">
        <Link to="/">Home</Link>
        <br></br>
        Faq Page
        {data.map((q) => {
          return <Ques key={q.id} id={q.id} title={q.title} info={q.info} />;
        })}
      </div>
    </div>
  );
};
