import { useState, useEffect } from "react";
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
    console.log("hi");
    const data = await text.json();
    console.log("hi");
    Setdata(data);
    SetLoading(false);
  };
  if (Loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      Faq Page
      {data.map((q) => {
        return <Ques id={q.id} title={q.title} info={q.info} />;
      })}
    </div>
  );
};
