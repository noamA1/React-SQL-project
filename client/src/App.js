import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import MainNavigation from "./components/layout/MainNavigation";
import AddVacation from "./components/pages/AddVacation";
import AuthPage from "./components/pages/auth/AuthPage.js";
import Home from "./components/pages/Home.js";
import Profile from "./components/pages/Profile.js";
import Vacations from "./components/pages/Vacations.js";
import io from "socket.io-client";
import { useEffect } from "react";
import { addNotification } from "./stateManagement/notifications.js";

const socket = io.connect("http://localhost:5001");

function App() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.message !== undefined) {
        dispatch(
          addNotification({ message: data.message, timeStemp: data.time })
        );
      }
    });
  }, [dispatch]);

  return (
    <div className='App'>
      <header>
        <MainNavigation socketObj={socket} />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          {!user.isSignIn && <Route path='/auth' element={<AuthPage />} />}

          {user.isSignIn && (
            <>
              <Route path='/home' element={<Home />} />
              <Route
                path='/vacations'
                element={<Vacations socketObj={socket} />}
              />
              <Route
                path='/add-vacation'
                element={<AddVacation socketObj={socket} />}
              />
              <Route path='/profile' element={<Profile />} />
            </>
          )}
          {!user.isSignIn && (
            <Route path='*' element={<Navigate to='/' replace />} />
          )}
        </Routes>
      </main>
    </div>
  );
}

export default App;
