import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { options, setDataset } from "../../common/Charts.js";
import VacationsFunctions from "../../common/VacationsFunctions.js";

const Home = () => {
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
      <h1>Followers summary</h1>
      {vacationsList.length > 0 && (
        <Container>
          {cahrtData !== null && <Bar options={options} data={cahrtData} />}
        </Container>
      )}

      {(vacationsList.length === 0 || vacationsList === null) && (
        <Box
          sx={{
            width: 500,
            height: 300,
            backgroundColor: "#c5f6fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            m: "auto",
            borderRadius: "5%",
          }}
        >
          <Typography variant='h3' component='h3' sx={{ color: "#868e96" }}>
            No one is yet following the vacations,
          </Typography>
          <Typography variant='h5' component='h5' sx={{ color: " #adb5bd" }}>
            the graph will be updated as new users follow
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Home;
