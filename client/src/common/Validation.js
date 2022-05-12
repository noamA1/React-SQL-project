import * as Yup from "yup";
export const registerValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    // .matches(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])$/,
    //   "Password must contain an uppercase letter and a lowercase letter and number"
    // )
    .required("Password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    //   .matches(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$'))
    .required("Password is required"),
});

export const profileValidationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

export const vacationValidationSchema = Yup.object({
  destination: Yup.string().min(3).required("Destination is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().integer().min(100).required("Price is required"),
});

export const dateDifference = (start, end) => {
  const diffInMs = new Date(end) - new Date(start);
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  console.log(diffInDays);
  if (diffInDays < 1) {
    return false;
  } else {
    return true;
  }
};

// startDate: Yup.date().required("Start Date is required"),
// endDate: Yup.date().required("End Date is required"),
// image: Yup.string().required("Image is required"),
