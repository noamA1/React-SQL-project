import { useCallback } from "react";
import VacationForm from "../UI/VacationForm";
import VacationsFunctions from "../../common/VacationsFunctions.js";
import { useDispatch } from "react-redux";

const AddVacation = (props) => {
  const dispatch = useDispatch();
  const addVacationHandler = useCallback(
    (newVacationObj) => {
      // VacationsFunctions.addNewVacation(newVacationObj);
      props.socketObj.emit(
        "send_message",
        "new vacation was added by the admin"
      );
      dispatch({ setNewMessage: "new vacation was added by the admin" });
    },
    [props.socketObj]
  );

  return <VacationForm onAdd={addVacationHandler} />;
};

export default AddVacation;
