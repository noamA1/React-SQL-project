import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@date-io/moment/";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { Field, Form, Formik } from "formik";
// import moment from "moment";
import { useEffect, useRef, useState } from "react";
import VacationsFunctions from "../../common/VacationsFunctions";
import { vacationValidationSchema } from "../../common/Validation";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const VacationForm = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  // const notificationAlert = useSelector((state) => state.alert);
  const [values, setValues] = useState({
    destination: (props.vacation && props.vacation.destination) || "",
    description: (props.vacation && props.vacation.description) || "",
    price: (props.vacation && props.vacation.price) || "",
    startDate: (props.vacation && props.vacation.startDate) || new Date(),
    endDate: (props.vacation && props.vacation.endDate) || new Date(),
    image: (props.vacation && props.vacation.image) || "",
  });
  const navigate = useNavigate();

  const [datesAndImageErrors, setdatesAndImageErrors] = useState({
    startDateError: false,
    endDateError: false,
    imageError: false,
  });
  //   const [value, setValue] = useState(moment().format());
  useEffect(() => {
    if (props.vacation) {
      setIsEditMode(true);
    }
  }, [props.vacation]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleStartDateChange = (newValue) => {
    if (newValue !== "") {
      setdatesAndImageErrors({ ...datesAndImageErrors, startDateError: false });
      try {
        setValues({ ...values, startDate: new Date(newValue).toISOString() });
      } catch (error) {}
    }
  };

  const handleEndDateChange = (newValue) => {
    if (newValue !== "") {
      setdatesAndImageErrors({ ...datesAndImageErrors, endDateError: false });
      try {
        setValues({ ...values, endDate: new Date(newValue).toISOString() });
      } catch (error) {}
    }
  };

  const submitHandler = () => {
    if (values.startDate === "") {
      setdatesAndImageErrors({ ...datesAndImageErrors, startDateError: true });
    } else if (values.endDate === "") {
      setdatesAndImageErrors({ ...datesAndImageErrors, endDateError: true });
    } else if (values.image === "") {
      setdatesAndImageErrors({ ...datesAndImageErrors, imageError: true });
    } else {
      if (isEditMode) {
        const setValuesForServer = { ...values, id: props.vacation.id };
        props.onUpdate(setValuesForServer);
        props.onClose();
      } else {
        props.onAdd(values);
      }
    }
  };

  const cancelHandler = () => {
    if (isEditMode) {
      props.onClose();
    } else {
      navigate("/vacations");
    }
  };

  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    const fileUploaded = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };

    setValues({ ...values, image: fileUploaded.data.name });
    sendImage(fileUploaded);
  };

  const sendImage = (image) => {
    let formData = new FormData();
    formData.append("file", image.data);
    VacationsFunctions.sendImage(formData);
  };
  return (
    <Container
      maxWidth='md'
      sx={{
        m: "auto",
        width: !isEditMode ? "100%" : "90%",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        {!isEditMode ? "Add New Vacation" : "Edit Vacation"}
      </h1>

      <Formik
        initialValues={values}
        validationSchema={vacationValidationSchema}
        onSubmit={(vacationFormValues, formikHelpers) => {
          submitHandler();
          formikHelpers.resetForm();
        }}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <FormControl
              sx={{ mb: 2, width: "100%" }}
              variant='outlined'
              onChange={handleChange("destination")}
            >
              <Field
                name='destination'
                type='text'
                as={TextField}
                value={values.destination}
                variant='outlined'
                color='primary'
                label='Destination'
                error={
                  Boolean(errors.destination) && Boolean(touched.destination)
                }
                helperText={Boolean(touched.destination) && errors.destination}
              />
            </FormControl>
            <FormControl
              sx={{ mb: 2, width: "100%" }}
              variant='outlined'
              onChange={handleChange("description")}
            >
              <Field
                name='description'
                type='text'
                as={TextField}
                value={values.description}
                variant='outlined'
                color='primary'
                label='description'
                error={
                  Boolean(errors.description) && Boolean(touched.description)
                }
                helperText={Boolean(touched.description) && errors.description}
              />
            </FormControl>
            <FormControl
              sx={{ mb: 2, width: "100%" }}
              variant='outlined'
              onChange={handleChange("price")}
            >
              <Field
                name='price'
                type='number'
                as={TextField}
                value={values.price}
                variant='outlined'
                color='primary'
                label='Price'
                error={Boolean(errors.price) && Boolean(touched.price)}
                helperText={Boolean(touched.price) && errors.price}
              />
            </FormControl>

            <FormControl sx={{ mb: 2, width: "100%" }} variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-image'>Image</InputLabel>
              <>
                <IconButton
                  onClick={handleClick}
                  sx={{ ":hover": { background: "none" } }}
                >
                  <PhotoSizeSelectActualOutlinedIcon />
                  Upload an image
                </IconButton>

                <input
                  type='file'
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  accept='image/*'
                  onChange={handleFileChange}
                />
                {datesAndImageErrors.imageError && (
                  <FormHelperText
                    sx={{ color: "red", fontSize: "14px", fontWeight: 600 }}
                  >
                    Image is required
                  </FormHelperText>
                )}
              </>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Stack spacing={3} sx={{ mb: 2, width: "100%" }}>
                <DesktopDatePicker
                  label='Start Date'
                  inputFormat='DD/MM/yyyy'
                  value={values.startDate}
                  onChange={handleStartDateChange}
                  renderInput={(params) => <TextField {...params} />}
                  error={!datesAndImageErrors.startDateError}
                />
                {datesAndImageErrors.startDateError && (
                  <FormHelperText
                    sx={{ color: "red", fontSize: "14px", fontWeight: 600 }}
                  >
                    Start date is required
                  </FormHelperText>
                )}

                <DesktopDatePicker
                  label='End Date'
                  inputFormat='DD/MM/yyyy'
                  value={values.endDate}
                  onChange={handleEndDateChange}
                  renderInput={(params) => <TextField {...params} />}
                />
                {datesAndImageErrors.endDateError && (
                  <FormHelperText
                    sx={{ color: "red", fontSize: "14px", fontWeight: 600 }}
                  >
                    End date is required
                  </FormHelperText>
                )}
              </Stack>
            </LocalizationProvider>
            <Stack
              direction='row'
              divider={<Divider orientation='vertical' flexItem />}
              spacing={2}
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: isEditMode ? "15px" : "none",
              }}
            >
              <Button
                type='submit'
                onClick={submitHandler}
                variant='contained'
                sx={{
                  backgroundColor: "#22b8cf",
                  ":hover": { backgroundColor: "#66d9e8" },
                }}
                size='large'
                disabled={
                  !isValid ||
                  !dirty ||
                  (datesAndImageErrors.startDateError &&
                    datesAndImageErrors.endDateError &&
                    datesAndImageErrors.imageError)
                }
              >
                {!isEditMode ? "Add Vacation" : "Edit vacation"}
              </Button>
              <Button type='button' onClick={cancelHandler} size='large'>
                Cancel
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default VacationForm;
