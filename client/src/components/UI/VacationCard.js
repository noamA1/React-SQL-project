import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import moment from "moment";
import { Box } from "@mui/system";

const VacationCard = (props) => {
  const user = useSelector((state) => state.user);
  let { id, destination, description, image, price, startDate, endDate } =
    props.item;
  const [disabledButton, setDisabledButton] = useState(false);
  const [vacationFollowers, setVacationFollowers] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const [vacationForEdit, setVacationForEdit] = useState({});

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const openFormModalHandler = () => {
    setVacationForEdit(props.item);
    setOpenModal(true);
  };

  useEffect(() => {
    const findFollowers = props.followers.find(
      (userVacationObj) => userVacationObj.vacationId === id
    );
    if (!findFollowers) {
      setVacationFollowers(0);
    } else {
      setVacationFollowers(findFollowers);
    }
  }, [props.followers, id]);

  useEffect(() => {
    const findVacation = props.usersVacations.find(
      (vacationUser) => vacationUser.vacationId === id
    );
    if (findVacation !== undefined) {
      setDisabledButton(true);
    }
  }, [props.usersVacations, id]);

  if (
    image.includes("some") ||
    image.includes("image") ||
    image.includes("images1") ||
    image.includes("1600x1200")
  ) {
    image = "";
  }

  const deleteHandler = () => {
    props.onDelete(id);
  };

  const followClickHandler = () => {
    if (!disabledButton) {
      props.addFollower(id);
    } else {
      props.unFollow(id);
      setDisabledButton(false);
    }
  };

  return (
    <>
      <Card key={`vacation-card-${id}`} sx={{ width: 400 }}>
        <CardActionArea>
          {image !== "" && (
            <CardMedia
              component='img'
              height='250'
              src={require(`../../assets/${image}`)}
              alt='green iguana'
            />
          )}
          <CardContent>
            <Typography
              gutterBottom
              variant='h4'
              component='div'
              sx={{ fontWeight: "700", fontStyle: "italic" }}
            >
              {destination}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.primery'
              sx={{ fontWeight: "600" }}
            >
              {description}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Start at: {moment(startDate).format("LL")}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              End at: {moment(endDate).format("LL")}
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Form: {price}$
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontSize: 23, fontWeight: 700 }}>
              {vacationFollowers.followers}
            </Typography>
            <Tooltip title={!disabledButton ? "Follow" : "Unfollow"}>
              <IconButton variant='outlined' onClick={followClickHandler}>
                <FavoriteRoundedIcon
                  sx={{
                    color: disabledButton ? "#fa5252" : "#495057",
                    fontSize: 32,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>

          <Tooltip title='Edit Vacation'>
            <IconButton
              onClick={() => {
                openFormModalHandler();
              }}
            >
              <EditIcon sx={{ fontSize: 30, color: "#3bc9db" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Delete Vacation'>
            <IconButton onClick={deleteHandler}>
              <DeleteIcon sx={{ fontSize: 30, color: "#e03131" }} />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>

      {openModal && (
        <Modal
          item={vacationForEdit}
          onCloseModal={onCloseModal}
          socketObj={props.socketObj}
        />
      )}
    </>
  );
};

export default VacationCard;
