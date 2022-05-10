import { Alert, Container } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Alerts from "../../common/Alerts.js";
import { updateInfo } from "../../stateManagement/user.js";
import { updateUser } from "../../stateManagement/userActions.js";
import FormCard from "../UI/FormCard.js";

const Profile = (props) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const updateProfileHandler = (userToUpdate, userId) => {
    updateUser(userToUpdate, userId);
    dispatch(updateInfo({ userInfo: userToUpdate }));
    setShowAlert(true);
    setTimeout(clearAlert, 5000);
  };
  console.log(
    typeof Alerts.successAlert("Your profile was updated successfully")
  );

  const clearAlert = () => {
    setShowAlert(false);
  };
  return (
    <>
      {showAlert &&
        Alerts.successAlert("Your profile was updated successfully")}
      <Container sx={{ mt: "15vh" }}>
        <FormCard
          title='Profile'
          updateProfile={updateProfileHandler}
          alert={showAlert}
        />
      </Container>
    </>
  );
};

export default Profile;
