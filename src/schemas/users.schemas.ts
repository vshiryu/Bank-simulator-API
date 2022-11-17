import * as yup from "yup";
import { SchemaOf } from "yup";
import { IUserRequest } from "../interfaces/user.interfaces";

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  username: yup.string().min(3).required(),
  password: yup
    .string()
    .min(8)
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
      "Password must have at least one lower and uppercase letter and one number"
    ),
  name: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().required(),
});

export default userSchema;
