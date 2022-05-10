import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../stateManagement/user";
import { Badge, Divider } from "@mui/material";
import { clearNotifications } from "../../stateManagement/notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import moment from "moment";

const pages = ["Home", "Vacations", "Add-Vacation"];
const settings = ["Profile", "Logout"];

const MainNavigation = (props) => {
  const user = useSelector((state) => state.user);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [notificationsArray, setNotificationsArray] = useState(
    notifications.messagesArray
  );

  const [userFullName, setUserFullName] = useState("");

  const navigate = useNavigate();

  const setNotifications = useCallback(() => {}, []);

  useEffect(() => {
    // setNotifications();
    setNotificationsArray(notifications.messagesArray);
  }, [setNotifications, notifications.messagesArray, setNotificationsArray]);

  useEffect(() => {
    setUserFullName(user.fullName);
  }, [user.fullName]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenNotificationsMenu = (event) => {
    if (notificationsArray.length > 0) {
      setAnchorElNotification(event.currentTarget);
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseNotificationsMenu = () => {
    setAnchorElNotification(null);
  };

  const userMenuHandler = (buttonName) => {
    if (buttonName === "profile") {
      navigate("/profile");
    } else {
      dispatch(signOut());
      navigate("/auth");
    }
    setAnchorElUser(null);
  };

  const navigateToHandler = (pageName) => {
    navigate(`/${pageName.toLowerCase()}`);
  };

  return (
    <AppBar
      position='static'
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(59,201,219,1) 0%, rgba(50,171,135,1) 100%)",
      }}
    >
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            Vacations Net
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    navigateToHandler(page);
                  }}
                >
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  navigateToHandler(page);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open notifications'>
              <IconButton
                onClick={handleOpenNotificationsMenu}
                sx={{ mr: 3, p: 0 }}
                color='inherit'
              >
                <Badge
                  badgeContent={
                    notificationsArray ? notificationsArray.length : 0
                  }
                  color='error'
                >
                  <NotificationsIcon sx={{ fontSize: 27 }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "33px", height: "auto" }}
              id='menu-appbar'
              anchorEl={anchorElNotification}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNotification)}
              onClose={handleCloseNotificationsMenu}
            >
              {notificationsArray.map((notification, index) => (
                <MenuItem
                  key={`notification-${index}`}
                  onClick={() => {
                    handleCloseNotificationsMenu();
                    dispatch(clearNotifications());
                  }}
                  sx={{ position: "relative", height: "40px" }}
                >
                  <Typography textAlign='center'>
                    {notification.message}
                  </Typography>
                  <Typography
                    variant='caption'
                    display='block'
                    position='absolute'
                    top='24px'
                    left='15px'
                    color='text.secondary'
                    mb='4px'
                  >
                    {moment(notification.timeStemp)
                      .startOf("minutes")
                      .fromNow()}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

            <Tooltip title='Open settings'>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                color='inherit'
              >
                <AccountCircle sx={{ fontSize: 33 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "33px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>Welcom back! {userFullName}</MenuItem>
              <Divider />
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    userMenuHandler(setting.toLowerCase());
                  }}
                >
                  {setting === "Logout" && <LogoutIcon sx={{ mr: 1.5 }} />}
                  {setting === "Profile" && (
                    <ManageAccountsSharpIcon sx={{ mr: 1.5 }} />
                  )}

                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MainNavigation;
