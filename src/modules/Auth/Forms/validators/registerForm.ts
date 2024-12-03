import { object as objectYup, string} from "yup";

export const validatorRegisterForm = objectYup({
  firstName: string().required(),
  lastName: string().required(),
  email: string().required(),
  password: string().required(),
})