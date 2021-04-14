import * as yup from "yup";
export default dateschema = yup.object().shape({
      message : yup.string(),
      accept : yup.bool().required(),
      reject : yup.bool().required(),
     description: yup.string().required(),
     startdate:yup.date(),
     enddate:yup.date(),
  });