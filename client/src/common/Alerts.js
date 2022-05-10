import { Alert } from "@mui/material";

const successAlert = (message) => {
  return (
    <Alert variant='outlined' severity='success'>
      {message}
    </Alert>
  );
};

const errorAlert = (message) => {
  return (
    <Alert variant='outlined' severity='error'>
      {message}
    </Alert>
  );
};
const infoAlert = (message) => {
  return (
    <Alert variant='outlined' severity='info'>
      {message}
    </Alert>
  );
};
const warningAlert = (message) => {
  return (
    <Alert variant='outlined' severity='warning'>
      {message}
    </Alert>
  );
};

export default {
  successAlert,
  errorAlert,
  infoAlert,
  warningAlert,
};
