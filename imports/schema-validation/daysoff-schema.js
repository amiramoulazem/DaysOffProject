import * as yup from "yup";
export const dateschema = yup.object().shape({
  response: yup.bool(),
  description: yup.string().required(),
  startdate: yup.date(),
  enddate: yup.date(),
});
export const rejectSchema = yup.object().shape({
  message: yup.string().required(),
});
