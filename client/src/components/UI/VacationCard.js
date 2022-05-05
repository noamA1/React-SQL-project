import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fab,
  Typography,
} from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const VacationCard = (props) => {
  let { id, destination, description, image, price, startDate, endDate } =
    props.item;
  // const followersList = props.usersVacations;
  const [disabledButton, setDisabledButton] = useState(false);
  const [vacationFollowers, setVacationFollowers] = useState({});
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const findFollowers = props.followers.find(
      (userVacationObj) => userVacationObj.vacationId === id
    );
    if (!findFollowers) {
      setVacationFollowers(0);
    } else {
      setVacationFollowers(findFollowers);
    }
  });

  useEffect(() => {
    const findVacation = props.usersVacations.find(
      (vacationUser) => vacationUser.vacationId === id
    );
    if (findVacation !== undefined) {
      setDisabledButton(true);
    }
  });

  if (
    image.includes("some") ||
    image.includes("image") ||
    image.includes("images1") ||
    image.includes("1600x1200")
  ) {
    image = "";
  }

  return (
    <Card key={`vacation-card-${id}`} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {image !== "" && (
          <>
            <CardMedia
              component='img'
              height='140'
              src={require(`../../assets/${image}`)}
              alt='green iguana'
            />
          </>
        )}
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {destination}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {description}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            Start at: {startDate}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            End at: {endDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Badge color='secondary' badgeContent={vacationFollowers.followers}>
          <Button
            disabled={disabledButton}
            variant='outlined'
            startIcon={<ThumbUpRoundedIcon />}
            onClick={() => {
              props.addFollower(id);
            }}
          >
            Follow
          </Button>
        </Badge>
        <Button
          onClick={() => {
            props.onEdit(props.item);
          }}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default VacationCard;
