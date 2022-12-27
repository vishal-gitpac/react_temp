import { useQuery } from "react-query";
import axios from "axios";
import Ques from "../question";

const fetchdata = () => {
  return axios.get("http://localhost:5000/api/Faq");
};
//react query manages cache very well.
//has 4 flags fetching stale fresh inactive
//stale can be set using stale time where the data stays fresh until the time provided is done
//useQuery function contains and promise to return which can be loading status , error and data fetched
//also has cahetime , refetchOnMount : true or false
//refetchwindow focus which enables us to stay sync with database changes
//polling is refetching data at regular at regular time intervals refetchInterval
//refetchIntervalInBackground : true to poll data even when browser is not in focus

export const RqFaq = () => {
  const { isLoading, data } = useQuery("questions", fetchdata);
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {data?.data.map((f) => {
        return <Ques id={f.id} title={f.title} info={f.info} />;
      })}
    </div>
  );
};
