import express from "express";
import cors from "cors";
import generalSetting from "./common/config.js";
import usersRouter from "./controllers/users-controller.js";
import vacationsRouter from "./controllers/vacations-controller.js";
import http from "https";
import { Server } from "socket.io";

// const io = new Server();

const app = express();
app.use(express.json());
app.use(cors());

// const server = http.createServer(app);
const server = app.listen(generalSetting.port, () => {
  console.log(`server is running on port ${generalSetting.port}`);
});

const io = new Server(server, {
  cors: {
    origin: `http://localhost:3000`,
    methods: ["GET", "POST", "PUT"],
  },
});

// io.listen(generalSetting.socketServerPort);
// io.listen(generalSetting.port, () => {
//   console.log(`SERVER IS RUNNING ON PORT ${generalSetting.socketServerPort}`);
// });

// io.on("connection", (data) => {
//   console.log(data);
// });

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});
app.use("/", usersRouter);
app.use("/", vacationsRouter);

// app.listen(generalSetting.port, () => {
//   console.log(`server is running on port ${generalSetting.port}`);
// });

// io.listen(generalSetting.socketServerPort, () => {
//   console.log(`SERVER IS RUNNING ON PORT ${generalSetting.socketServerPort}`);
// });
