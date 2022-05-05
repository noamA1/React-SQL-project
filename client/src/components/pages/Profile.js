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
    <>
      <h1>Profile page</h1>
      <FormCard title='Profile' updateProfile={updateProfileHandler} />
    </>
  );
};

export default Profile;
