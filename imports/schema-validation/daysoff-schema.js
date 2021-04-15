import * as yup from "yup";
export default dateschema = yup.object().shape({
  message: yup.string().notRequired(),
  response: yup.bool(),
  description: yup.string().required(),
  startdate: yup.date(),
  enddate: yup.date(),
});
