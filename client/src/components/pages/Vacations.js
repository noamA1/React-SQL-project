import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../../common/Alerts.js";
import VacationsFunctions from "../../common/VacationsFunctions.js";
import { dismissAlert, setAlert } from "../../stateManagement/alert.js";
import CircularProgressWithLabel from "../UI/CircularProgressWithLabel.js";
import VacationCard from "../UI/VacationCard";

const Vacations = (props) => {
  const socket = props.socketObj;
  const dispatch = useDispatch();
  const notificationAlert = useSelector((state) => state.alert);
  const [vacationsList, setVacationsList] = useState([]);
  const [vacationsFolowers, setVacationsFolowers] = useState([]);
  const [vacationsFolowersList, setVacationsFolowersList] = useState([]);
  const [progress, setProgress] = useState(25);
  const [isLoading, setIsLoading] = useState(true);

  const [alertType, setAlertType] = useState(null);
  const user = useSelector((state) => state.user);

  const getVacationsList = async () => {
    const list = await VacationsFunctions.getAllVacations();
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress === 100 ? 0 : prevProgress + 25
      );
    }, 800);

    const followersCount =
      await VacationsFunctions.getVacationsFollowersCount();
    const listOfAllFollowers = await VacationsFunctions.getVacationsFollowers();
    const filteredUserVacationsList = listOfAllFollowers.filter(
      (follower) => follower.userId === user.userId
    );
    setVacationsFolowersList(filteredUserVacationsList);
    setVacationsFolowers(followersCount);
    setVacationsList(list);
    return () => {
      clearInterval(timer);
    };
  };

  const dismiss = useCallback(() => {
    setTimeout(() => {
      dispatch(dismissAlert());
    }, 5000);
  }, [dispatch]);

  useEffect(() => {
    getVacationsList();
    if (vacationsList !== null && progress >= 100) {
      setIsLoading(false);
    }
  }, [vacationsList, progress]);

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

    socket.emit("send_message", {
      message: "Vacation was deleted by the admin",
      time: new Date(),
    });
  };

  return (
    <>
      {notificationAlert.isShow && alertType}
      <h1>Our Vacations</h1>
      {isLoading && <CircularProgressWithLabel value={progress} />}
      {!isLoading && vacationsList.length > 0 && (
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
      )}

      {!isLoading && vacationsList === null && (
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
            No vacations yet,
          </Typography>
          <Typography variant='h5' component='h5' sx={{ color: " #adb5bd" }}>
            new vacations will be coming soon
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Vacations;
