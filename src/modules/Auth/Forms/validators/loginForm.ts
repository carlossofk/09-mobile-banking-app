import { object as objectYup, string} from "yup";

export const validatorLoginForm = objectYup({
  email: string().required(),
  password: string().required(),
})