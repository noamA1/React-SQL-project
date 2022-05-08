import { useCallback } from "react";
import VacationForm from "../UI/VacationForm";
import VacationsFunctions from "../../common/VacationsFunctions.js";

const AddVacation = (props) => {
  const addVacationHandler = useCallback(
    (newVacationObj) => {
      // VacationsFunctions.addNewVacation(newVacationObj);
      props.socketObj.emit("send_message", {
        message: "new vacation was added by the admin",
        time: new Date(),
      });
    },
    [props.socketObj]
  );

  return <VacationForm onAdd={addVacationHandler} />;
};

export default AddVacation;
