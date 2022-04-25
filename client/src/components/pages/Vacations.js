import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VacationsFunctions from "../../common/VacationsFunctions";
import VacationCard from "../UI/VacationCard";

const Vacations = (props) => {
  const [vacationsList, setVacationsList] = useState([]);
  const [vacationsFolowers, setVacationsFolowers] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getVacationsList();
  }, []);

  const getVacationsList = useCallback(async () => {
    const list = await VacationsFunctions.getAllVacations();
    const followersList = await VacationsFunctions.getVacationsFollowers();
    setVacationsFolowers(followersList);
    setVacationsList(list);
  }, []);

  const followEventHandler = (id) => {
    VacationsFunctions.addFollower(user.userId, id);
    getVacationsList();
  };

  return (
    <>
      <h1>Vacations Page!</h1>
      {vacationsList.map((vacation) => {
        return (
          <VacationCard
            item={vacation}
            userId={user.userId}
            followers={vacationsFolowers}
            addFollower={followEventHandler}
          />
        );
      })}
    </>
  );
};

export default Vacations;
