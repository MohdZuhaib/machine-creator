import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string("Enter machine name").required("Machine name is required"),
  description: yup.string("Enter the description").required("Description is required"),

});
