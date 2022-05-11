import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { options, setDataset } from "../../common/Charts.js";
import VacationsFunctions from "../../common/VacationsFunctions.js";

const Home = () => {
  const user = useSelector((state) => state.user);
  const [vacationsList, setVacationsList] = useState([]);
  const [vacationsFolowers, setVacationsFolowers] = useState([]);
  const [cahrtData, setCahrtData] = useState(null);

  const getVacationsList = async () => {
    const list = await VacationsFunctions.getAllVacations();

    const followersCount =
      await VacationsFunctions.getVacationsFollowersCount();

    setVacationsList(list);

    setVacationsFolowers(followersCount);
  };
  useEffect(() => {
    getVacationsList();
  }, []);

  useEffect(() => {
    if (vacationsList.length > 0 && vacationsFolowers.length > 0) {
      const tempCahrtData = setDataset(vacationsList, vacationsFolowers);
      setCahrtData(tempCahrtData);
    }
  }, [vacationsList, vacationsFolowers]);

  return (
    <>
      <h1>Home Page!</h1>
      <Container>
        {cahrtData !== null && <Bar options={options} data={cahrtData} />}
      </Container>
    </>
  );
};

export default Home;
