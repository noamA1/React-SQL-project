const addNewVacation = async (newVacationObj) => {
  const preperdVacation = {
    ...newVacationObj,
    startDate: newVacationObj.startDate.substring(0, 10),
    endDate: newVacationObj.endDate.substring(0, 10),
  };

  const res = await fetch(`http://localhost:5000/api/vacations`, {
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
  const respone = await fetch(`http://localhost:5000/api/vacations`);
  const data = await respone.json();
  return data;
};

const getVacationsFollowers = async () => {
  const respone = await fetch(`http://localhost:5000/api/vacations-followers`);
  const data = await respone.json();
  return data;
};

const addFollower = async (userId, vacationId) => {
  const preperdBody = {
    user: userId,
    vacation: vacationId,
  };

  const res = await fetch(`http://localhost:5000/api/vacations-followers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(preperdBody),
  });
  const data = await res.json();
  return data;
};

const sendImage = async (formData) => {
  const response = await fetch(`http://localhost:5000/api/vacations-image`, {
    method: "POST",
    body: formData,
  });
  if (response) {
    console.log(response.statusText);
  }
};

export default {
  sendImage,
  addNewVacation,
  getAllVacations,
  getVacationsFollowers,
  addFollower,
};
