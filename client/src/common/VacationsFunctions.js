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

const sendImage = async (formData) => {
  // console.log(form);
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
};
