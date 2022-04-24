import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";

const VacationCard = (props) => {
  let { id, destination, description, image, price, startDate, endDate } =
    props.item;
  if (
    image.includes("some") ||
    image.includes("image") ||
    image.includes("images1")
  ) {
    image = "";
  }
  return (
    // <>
    //   <img src={require("../../assets/images.jpg")} />
    // </>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {image !== "" && (
          <CardMedia
            component='img'
            height='140'
            src={require(`../../assets/${image}`)}
            alt='green iguana'
          />
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
        <Button variant='outlined' startIcon={<ThumbUpRoundedIcon />}>
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};

export default VacationCard;
