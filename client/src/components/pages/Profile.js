import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateInfo } from "../../stateManagement/user.js";
import { updateUser } from "../../stateManagement/userActions.js";
import FormCard from "../UI/FormCard.js";

const Profile = (props) => {
  const dispatch = useDispatch();

  const updateProfileHandler = (userToUpdate, userId) => {
    updateUser(userToUpdate, userId);
    dispatch(updateInfo({ userInfo: userToUpdate }));
  };
  return (
    <Container sx={{ mt: "15vh" }}>
      <FormCard title='Profile' updateProfile={updateProfileHandler} />
    </Container>
  );
};

export default Profile;
