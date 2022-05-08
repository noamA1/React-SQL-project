const getUser = async (userEmail, userPassword) => {
  const respone = await fetch(
    `http://localhost:5000/api/users/${userEmail}/${userPassword}`
  );

  const data = await respone.json();
  return data;
};

const checkEmail = async (userEmail) => {
  const respone = await fetch(`http://localhost:5000/api/users/${userEmail}`);

  const data = await respone.json();
  return data;
};

const postNewUser = async (newUser) => {
  console.log(newUser);
  const respone = await fetch(`http://localhost:5000/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const data = await respone.json();
  return data;
};

const updateUser = async (updatedUser, userId) => {
  const respone = await fetch(`http://localhost:5000/api/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  const data = await respone.json();
  return data;
};

export { getUser, postNewUser, checkEmail, updateUser };
