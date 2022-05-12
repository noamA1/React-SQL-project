import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../stateManagement/user";
import { getUser, postNewUser } from "../../../common/userActions.js";
import FormCard from "../../UI/FormCard";
import Alerts from "../../../common/Alerts";
import { dismissAlert, setAlert } from "../../../stateManagement/alert";
import { useCallback } from "react";
import CryptoJS from "crypto-js";
import keys from "../../../common/config.js";

const AuthPage = () => {
  const notificationAlert = useSelector((state) => state.alert);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = async (email, pass) => {
    const loginUser = await getUserData(email, pass);

    if (loginUser === "Invalid Credentials") {
      dispatch(
        setAlert({
          type: "error",
          message: "Invalid Credentials, please try again",
        })
      );
      dismiss();
    } else {
      const encryptedUserData = CryptoJS.AES.encrypt(
        JSON.stringify({ ...loginUser[0] }),
        keys.TOKEN_SECRET
      ).toString();

      sessionStorage.setItem("connected-user", encryptedUserData);
      dispatch(signIn({ userInfo: { ...loginUser[0] } }));
      navigate("/vacations");
    }
  };
  const dismiss = useCallback(() => {
    setTimeout(() => {
      dispatch(dismissAlert());
    }, 5000);
  }, [dispatch]);

  const registerHandler = (newUser) => {
    postNewUser(newUser);
  };

  const getUserData = async (email, password) => {
    const userData = await getUser(email, password);
    return userData;
  };

  return (
    <>
      {notificationAlert.isShow && Alerts.errorAlert(notificationAlert.message)}
      <Container sx={{ mt: "15vh" }}>
        <FormCard
          title='Login'
          onRegister={registerHandler}
          onLogIn={logInHandler}
        />
      </Container>
    </>
  );
};

export default AuthPage;
