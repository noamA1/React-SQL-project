import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./components/pages/Home";

function App() {
  return (
    <div className='App'>
      <header></header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
