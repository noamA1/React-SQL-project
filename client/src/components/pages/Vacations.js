import Modal from "../UI/Modal.js";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VacationsFunctions from "../../common/VacationsFunctions.js";
import VacationCard from "../UI/VacationCard";

const Vacations = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [vacationForEdit, setVacationForEdit] = useState({});
  const [vacationsList, setVacationsList] = useState([]);
  const [vacationsFolowers, setVacationsFolowers] = useState([]);
  const [vacationsFolowersList, setVacationsFolowersList] = useState([]);
  const user = useSelector((state) => state.user);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const openFormModalHandler = (vacationToUpdate) => {
    setVacationForEdit(vacationToUpdate);
    setOpenModal(true);
  };

  useEffect(() => {
    getVacationsList();
  }, [onCloseModal]);

  const getVacationsList = async () => {
    const list = await VacationsFunctions.getAllVacations();
    const followersCount =
      await VacationsFunctions.getVacationsFollowersCount();
    const listOfAllFollowers = await VacationsFunctions.getVacationsFollowers();
    const filteredUserVacationsList = listOfAllFollowers.filter(
      (follower) => follower.userId === user.userId
    );
    setVacationsFolowersList(filteredUserVacationsList);
    setVacationsFolowers(followersCount);
    setVacationsList(list);
  };

  const followEventHandler = (id) => {
    VacationsFunctions.addFollower(user.userId, id);
    getVacationsList();
  };

  const deleteVacationHandler = (vacationId) => {
    VacationsFunctions.deleteVacation(vacationId);
  };

  return (
    <>
      <h1>Vacations Page!</h1>
      {vacationsList.map((vacation) => {
        return (
          <VacationCard
            key={`vacation-${vacation.id}`}
            item={vacation}
            userId={user.userId}
            followers={vacationsFolowers}
            addFollower={followEventHandler}
            usersVacations={vacationsFolowersList}
            onEdit={openFormModalHandler}
            onDelete={deleteVacationHandler}
          />
        );
      })}
      {openModal && (
        <Modal item={vacationForEdit} onCloseModal={onCloseModal} />
      )}
    </>
  );
};

export default Vacations;
