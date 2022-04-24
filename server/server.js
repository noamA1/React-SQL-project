import express from "express";
import cors from "cors";
import generalSetting from "./common/config.js";
import usersRouter from "./controllers/users-controller.js";
import vacationsRouter from "./controllers/vacations-controller.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", usersRouter);
app.use("/", vacationsRouter);
app.use(express.static("images"));

app.listen(generalSetting.port, () => {
  console.log(`server is running on port ${generalSetting.port} localhost!`);
});
