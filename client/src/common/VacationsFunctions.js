import { io } from "socket.io-client";
import keys from "./config";

const addNewVacation = async (newVacationObj) => {
  const preperdVacation = {
    ...newVacationObj,
    startDate: newVacationObj.startDate.substring(0, 10),
    endDate: newVacationObj.endDate.substring(0, 10),
  };

  const res = await fetch(`${keys.url}/vacations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preperdVacation),
  });
  const data = await res.json();
  return data;
};

const getAllVacations = async () => {
  const respone = await fetch(`${keys.url}/vacations`);
  const data = await respone.json();
  return data;
};

const getVacationsFollowersCount = async () => {
  const respone = await fetch(`${keys.url}/group-vacations-followers`);
  const data = await respone.json();
  return data;
};

const getVacationsFollowers = async () => {
  const respone = await fetch(`${keys.url}/vacations-followers`);
  const data = await respone.json();
  return data;
};

const addFollower = async (userId, vacationId) => {
  const preperdBody = {
    user: userId,
    vacation: vacationId,
  };

  const res = await fetch(`${keys.url}/vacations-followers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preperdBody),
  });
  const data = await res.json();
  return data;
};

export const updateVacation = async (updatedVacation) => {
  const preperdVacationBody = {
    ...updatedVacation,
    startDate: new Date(updatedVacation.startDate)
      .toISOString()
      .substring(0, 10),
    endDate: new Date(updatedVacation.endDate).toISOString().substring(0, 10),
  };

  const respone = await fetch(`${keys.url}/vacations/${updatedVacation.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preperdVacationBody),
  });
  const data = await respone.json();
  return data;
};

const sendImage = async (formData) => {
  const response = await fetch(`${keys.url}/vacation-image`, {
    method: "POST",
    body: formData,
  });
  if (response) {
    console.log(response.statusText);
  }
};

const deleteVacation = async (id) => {
  const response = await fetch(`${keys.url}/vacations/${id}`, {
    method: "DELETE",
  });
  if (response) {
    console.log(response.statusText);
  }
};

const removeFollower = async (uId, vacationId) => {
  const preperdBody = { vacationId, userId: uId };

  const response = await fetch(`${keys.url}/vacations-followers`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preperdBody),
  });
  if (response) {
    console.log(response.statusText);
  }
};

// export const socket = io.connect("http://localhost:5001");
// export const socket = io.connect(`${keys.url}`);

export default {
  sendImage,
  addNewVacation,
  getAllVacations,
  getVacationsFollowers,
  getVacationsFollowersCount,
  updateVacation,
  addFollower,
  removeFollower,
  deleteVacation,
};
