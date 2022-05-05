import { Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import VacationForm from "./VacationForm";

const Modal = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClose = () => {
    setOpen(false);
    props.onCloseModal();
  };

  const onSubmiteHandler = () => {};

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new Medicine:</DialogTitle>
      <VacationForm vacation={props.item} onClose={handleClose} />
    </Dialog>
  );
};

export default Modal;
