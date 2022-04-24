import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../stateManagement/user";
import { getUser, postNewUser } from "../../../stateManagement/userActions";
import FormCard from "../../UI/FormCard";

const AuthPage = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logInHandler = async (email, pass) => {
    const loginUser = await getUserData(email);
    if (loginUser.lengh === 0) {
      alert("Wrong email or password");
    } else {
      if (checkPassword(pass, loginUser[0].password)) {
        dispatch(signIn({ userInfo: { ...loginUser[0] } }));
        navigate("/home");
      }
    }
  };

  const registerHandler = (newUser) => {
    postNewUser(newUser);
  };

  const getUserData = async (email) => {
    const userData = await getUser(email);
    return userData;
  };

  const checkPassword = (enteredPassword, confirmPassword) => {
    if (enteredPassword === confirmPassword) {
      return true;
    } else {
      alert("Wrong email or password");
      return false;
    }
  };

  return (
    <>
      <h1>Auth Page</h1>
      <FormCard
        title='Login'
        onRegister={registerHandler}
        onLogIn={logInHandler}
      />
    </>
  );
};

export default AuthPage;
