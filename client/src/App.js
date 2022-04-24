import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router";
import "./App.css";
import MainNavigation from "./components/layout/MainNavigation";
import AddVacation from "./components/pages/AddVacation";
import AuthPage from "./components/pages/auth/AuthPage.js";
import Home from "./components/pages/Home.js";
import Profile from "./components/pages/Profile.js";
import Vacations from "./components/pages/Vacations.js";

function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className='App'>
      <header>
        <MainNavigation />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<AuthPage />} />
          {!user.isSignIn && <Route path='/auth' element={<AuthPage />} />}

          {user.isSignIn && (
            <>
              <Route path='/home' element={<Home />} />
              <Route path='/vacations' element={<Vacations />} />
              <Route path='/add-vacation' element={<AddVacation />} />
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
