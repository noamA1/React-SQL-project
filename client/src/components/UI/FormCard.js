import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";

import classes from "./FormCard.module.css";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { getUser } from "../../stateManagement/userActions";
import { useSelector } from "react-redux";

const FormCard = (props) => {
  let error;
  const userInfo = useSelector((state) => state.user.userInfo);

  const [isLogin, setIsLogin] = useState(true);
  const [cardTitle, setCardTitle] = useState("");

  useEffect(() => {
    if (props.title === "Profile") {
      setCardTitle("Your Profile");
    } else if (isLogin) {
      setCardTitle("Login");
    } else {
      setCardTitle("Create Account");
    }
  }, [isLogin]);

  const [values, setValues] = useState({
    firstName: userInfo.firstName || "",
    lastName: userInfo.lastName || "",
    email: userInfo.email || "",
    password: "",
    showPassword: false,
  });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkEmailHandler = async (e) => {
    const emailToCheck = e.target.value;
    if (emailToCheck) {
      const userData = await getUser(emailToCheck);
      console.log(userData);
      userData.length === 0 ? (error = false) : (error = true);
      console.log(error);
    }
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const submitHandler = () => {
    if (isLogin) {
      props.onLogIn(values.email, values.password);
    } else {
      props.onRegister({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email.toLowerCase(),
        password: values.password,
      });
    }
  };

  return (
    <Container className={classes.formContainer} maxWidth='sm'>
      <Card className={classes.card} sx={{ justifyItems: "center" }}>
        <AccountCircle
          sx={{ fontSize: 60, marginLeft: "auto", marginRight: "auto" }}
          color='primary'
        />
        <CardHeader title={cardTitle} />
        <CardContent>
          {/* <form> */}
          {(!isLogin || props.title === "Profile") && (
            <>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-firstName'>
                  First Name
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-firstName'
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  label='First Name'
                />
              </FormControl>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-lastName'>
                  Last Name
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-lastName'
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  label='Last Name'
                />
              </FormControl>
            </>
          )}

          <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
            <InputLabel htmlFor='outlined-adornment-email'>Email</InputLabel>
            <OutlinedInput
              id='outlined-adornment-email'
              value={values.email}
              onChange={handleChange("email")}
              label='Email'
              error={error}
              helpertext={error ? "This email is alredy exists" : ""}
            />
          </FormControl>
          {props.title !== "Profile" && (
            <>
              <FormControl sx={{ m: 1, width: "100%" }} variant='outlined'>
                <InputLabel htmlFor='outlined-adornment-password'>
                  Password
                </InputLabel>
                <OutlinedInput
                  id='outlined-adornment-password'
                  type={values.showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange("password")}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge='end'
                      >
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label='Password'
                />
              </FormControl>
              <Button size='small' onClick={switchAuthModeHandler}>
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            </>
          )}

          {/* </form> */}
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button onClick={submitHandler} size='small'>
            Submit
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default FormCard;

// {!isLogin && onBlur={checkEmailHandler}}
