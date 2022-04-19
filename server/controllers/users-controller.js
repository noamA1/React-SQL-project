import express from "express";
import usersBl from "../business-logic/users-bl.js";
import generalSetting from "../common/config.js";
import { checkResultStatus } from "../common/helper.js";

const usersRouter = express.Router();

usersRouter.get(`${generalSetting.baseUrl}/users`, async (req, res) => {
  const getResult = await usersBl.getAll();
  if (!checkResultStatus(getResult)) {
    return res.status(500).send(getResult);
  } else {
    return res.send(getResult.data);
  }
});

usersRouter.get(`${generalSetting.baseUrl}/users/:email`, async (req, res) => {
  const email = req.params.email;
  const getUserResult = await usersBl.getUserBy(email);
  if (!checkResultStatus(getUserResult)) {
    return res.status(500).send(getUserResult);
  } else {
    return res.send(getUserResult.data);
  }
});

usersRouter.post(`${generalSetting.baseUrl}/users`, async (req, res) => {
  const body = req.body;
  const postResult = await usersBl.addUser(body);

  if (!checkResultStatus(postResult)) {
    return res.status(500).send(postResult);
  } else {
    postResult.data = {
      id: postResult.data.insertId,
      ...body,
    };
    return res.send(postResult.data);
  }
});

usersRouter.put(`${generalSetting.baseUrl}/users/:id`, async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updateResult = await usersBl.updateUser(id, body);
  if (!checkResultStatus(updateResult)) {
    return res.status(500).send(updateResult);
  } else {
    updateResult.data = {
      id,
      ...body,
    };
    return res.send(updateResult.data);
  }
});

export default usersRouter;
