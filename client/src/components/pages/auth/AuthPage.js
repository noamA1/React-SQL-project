import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../stateManagement/user";
import { getUser, postNewUser } from "../../../common/userActions.js";
import FormCard from "../../UI/FormCard";

const AuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = async (email, pass) => {
    const loginUser = await getUserData(email, pass);
    if (loginUser === "Invalid Credentials") {
      console.log("faild");
    } else {
      dispatch(signIn({ userInfo: { ...loginUser[0] } }));
      navigate("/home");
    }
  };

  const registerHandler = (newUser) => {
    postNewUser(newUser);
  };

  const getUserData = async (email, password) => {
    const userData = await getUser(email, password);
    return userData;
  };

  return (
    <Container sx={{ mt: "15vh" }}>
      <FormCard
        title='Login'
        onRegister={registerHandler}
        onLogIn={logInHandler}
      />
    </Container>
  );
};

export default AuthPage;
