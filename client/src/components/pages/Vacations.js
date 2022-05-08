import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VacationsFunctions from "../../common/VacationsFunctions.js";
import VacationCard from "../UI/VacationCard";

const Vacations = (props) => {
  const socket = props.socketObj;
  const [vacationsList, setVacationsList] = useState([]);
  const [vacationsFolowers, setVacationsFolowers] = useState([]);
  const [vacationsFolowersList, setVacationsFolowersList] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getVacationsList();
  }, []);

  const getVacationsList = async () => {
    const list = await VacationsFunctions.getAllVacations();
    const followersCount =
      await VacationsFunctions.getVacationsFollowersCount();
    const listOfAllFollowers = await VacationsFunctions.getVacationsFollowers();
    const filteredUserVacationsList = listOfAllFollowers.filter(
      (follower) => follower.userId === user.userId
    );
    setVacationsFolowersList(filteredUserVacationsList);
    setVacationsFolowers(followersCount);
    setVacationsList(list);
  };

  const followEventHandler = (id) => {
    VacationsFunctions.addFollower(user.userId, id);
    getVacationsList();
  };

  const deleteVacationHandler = (vacationId) => {
    console.log(new Date());
    // VacationsFunctions.deleteVacation(vacationId);
    socket.emit("send_message", {
      message: "Vacation was deleted by the admin",
      time: new Date(),
    });
  };

  return (
    <>
      <h1>Our Vacations</h1>
      <Grid
        container
        direction='row'
        justifyContent='space-evenly'
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {vacationsList.map((vacation) => {
          return (
            <Grid item key={`vacation-${vacation.id}`}>
              <VacationCard
                item={vacation}
                userId={user.userId}
                followers={vacationsFolowers}
                addFollower={followEventHandler}
                usersVacations={vacationsFolowersList}
                socketObj={socket}
                onDelete={deleteVacationHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Vacations;
