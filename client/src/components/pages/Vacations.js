import { useEffect, useState } from "react";
import VacationsFunctions from "../../common/VacationsFunctions";
import VacationCard from "../UI/VacationCard";

const Vacations = (props) => {
  const [vacationsList, setVacationsList] = useState([]);

  useEffect(() => {
    getVacationsList();
  }, []);

  const getVacationsList = async () => {
    const list = await VacationsFunctions.getAllVacations();
    setVacationsList(list);
  };

  return (
    <>
      <h1>Vacations Page!</h1>
      {vacationsList.map((vacation) => {
        return <VacationCard item={vacation} />;
      })}
      {/* <VacationCard /> */}
    </>
  );
};

export default Vacations;
