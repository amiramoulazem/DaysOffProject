import * as yup from "yup";
export default registrationSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
  repeatedPassword: yup
    .string()
    .required("password confirmation is required ")
    .oneOf([yup.ref("password"), null], "password does not match"),
});
