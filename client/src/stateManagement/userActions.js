const getUser = async (userEmail, userPassword) => {
  const respone = await fetch(
    `http://localhost:5000/api/users/${userEmail}/${userPassword}`
  );

  const data = await respone.json();
  return data;
};

const postNewUser = async (newUser) => {
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

export { getUser, postNewUser };
