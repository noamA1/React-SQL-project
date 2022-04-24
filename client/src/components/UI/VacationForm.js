import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { LocalizationProvider } from "@date-io/moment/";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useRef, useState } from "react";
import VacationsFunctions from "../../common/VacationsFunctions";

const VacationForm = (props) => {
  const [image, setImage] = useState({ preview: "", data: "" });
  const [values, setValues] = useState({
    destination: "",
    description: "",
    price: "",
    startDate: "",
    endDate: "",
    image: "",
  });
  //   const [value, setValue] = useState(moment().format());
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleStartDateChange = (newValue) => {
    setValues({ ...values, startDate: new Date(newValue).toISOString() });
  };

  const handleEndDateChange = (newValue) => {
    setValues({ ...values, endDate: new Date(newValue).toISOString() });
  };

  const submitHandler = () => {
    VacationsFunctions.addNewVacation(values);
  };

  console.log(values);
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (event) => {
    const fileUploaded = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    };
    console.log(fileUploaded);
    setImage(fileUploaded);
    setValues({ ...values, image: fileUploaded.data.name });
    sendImage();
  };

  const sendImage = () => {
    let formData = new FormData();
    formData.append("file", image.data);
    console.log(image.data.name);
    VacationsFunctions.sendImage(formData);
  };
  return (
    <Container
      maxWidth='md'
      sx={{
        m: "auto",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormControl sx={{ m: 2, width: "100%" }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-destination'>
          Destination
        </InputLabel>
        <OutlinedInput
          value={values.destination}
          onChange={handleChange("destination")}
          label='Destination'
        />
      </FormControl>
      <FormControl sx={{ m: 2, width: "100%" }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-description'>
          Description
        </InputLabel>
        <OutlinedInput
          id='outlined-adornment-description'
          multiline
          rows={2}
          value={values.description}
          onChange={handleChange("description")}
          label='Description'
        />
      </FormControl>
      <FormControl sx={{ m: 2, width: "100%" }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-price'>price</InputLabel>
        <OutlinedInput
          id='outlined-adornment-price'
          type='number'
          value={values.price}
          onChange={handleChange("price")}
          startAdornment={<InputAdornment position='start'>$</InputAdornment>}
          label='price'
        />
      </FormControl>
      <FormControl sx={{ m: 2, width: "100%" }} variant='outlined'>
        <InputLabel htmlFor='outlined-adornment-image'>Image</InputLabel>
        {/* <OutlinedInput
          value={values.image}
          sx={{ paddingLeft: 10 }}
          type='file'
          onChange={handleChange("image")}
          label='Image'
        /> */}
        <>
          <Button onClick={handleClick}>Upload a file</Button>
          <input
            type='file'
            ref={hiddenFileInput}
            style={{ display: "none" }}
            accept='image/*'
            onChange={handleFileChange}
          />
        </>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Stack spacing={3} sx={{ m: 2, width: "100%" }}>
          <DesktopDatePicker
            label='Start Date'
            inputFormat='DD/MM/yyyy'
            value={values.startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label='End Date'
            inputFormat='DD/MM/yyyy'
            value={values.endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <Button onClick={submitHandler} size='small'>
        Add Vacation
      </Button>
    </Container>
  );
};

export default VacationForm;
