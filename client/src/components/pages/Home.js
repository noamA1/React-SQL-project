import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  return <h1>Home Page!</h1>;
};

export default Home;
