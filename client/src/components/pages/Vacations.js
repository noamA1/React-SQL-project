import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../common/Alerts.js";
import VacationsFunctions from "../../common/VacationsFunctions.js";
import { dismissAlert, setAlert } from "../../stateManagement/alert.js";
import VacationCard from "../UI/VacationCard";

const Vacations = (props) => {
  const socket = props.socketObj;
  const dispatch = useDispatch();
  const notificationAlert = useSelector((state) => state.alert);
  const [vacationsList, setVacationsList] = useState([]);
  const [vacationsFolowers, setVacationsFolowers] = useState([]);
  const [vacationsFolowersList, setVacationsFolowersList] = useState([]);

  const [alertType, setAlertType] = useState(null);
  const user = useSelector((state) => state.user);

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

  const dismiss = useCallback(() => {
    setTimeout(() => {
      dispatch(dismissAlert());
    }, 5000);
  }, [dispatch]);

  useEffect(() => {
    getVacationsList();
  }, [getVacationsList]);

  useEffect(() => {
    if (notificationAlert.isShow) {
      switch (notificationAlert.type) {
        case "success":
          setAlertType(Alerts.successAlert(notificationAlert.message));
          break;
        case "warning":
          setAlertType(Alerts.warningAlert(notificationAlert.message));
          break;
        default:
          setAlertType(Alerts.infoAlert(notificationAlert.message));
          break;
      }
      dismiss();
    }
  }, [
    notificationAlert.isShow,
    notificationAlert.type,
    setAlertType,
    dismiss,
    notificationAlert.message,
  ]);
  // console.log(alertType);

  const followEventHandler = (id) => {
    VacationsFunctions.addFollower(user.userId, id);
    getVacationsList();
  };

  const unFollowHandler = (vacationId) => {
    VacationsFunctions.removeFollower(user.userId, vacationId);
    getVacationsList();
  };

  const deleteVacationHandler = (vacationId) => {
    console.log(new Date());
    // VacationsFunctions.deleteVacation(vacationId);
    dispatch(
      setAlert({
        type: "warning",
        message: "The vacation has been deleted",
      })
    );
    // dismiss();
    socket.emit("send_message", {
      message: "Vacation was deleted by the admin",
      time: new Date(),
    });
  };

  return (
    <>
      {notificationAlert.isShow && alertType}
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
                unFollow={unFollowHandler}
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
