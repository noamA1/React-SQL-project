import { Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";

import VacationsFunctions from "../../common/VacationsFunctions";
import VacationForm from "./VacationForm";

const Modal = (props) => {
  const socketObj = props.socketObj;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleClickOpen();
  }, [handleClickOpen]);

  const handleClose = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const onSubmiteHandler = (vacation) => {
    console.log(vacation);
    socketObj.emit("send_message", {
      message: "Vacation was updated by the admin",
      time: new Date(),
    });
    // VacationsFunctions.updateVacation(vacation);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <VacationForm
        vacation={props.item}
        onClose={handleClose}
        onUpdate={onSubmiteHandler}
      />
    </Dialog>
  );
};

export default Modal;
