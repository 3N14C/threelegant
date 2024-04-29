import { z } from "zod";

export const formSignUpSchema = z.object({
  name: z.string().min(1, "Имя не может быть пустым"),
  username: z.string().min(1, "Имя пользователя не может быть пустым"),
  email: z.string().email("Некорректная почта"),
  password: z.string().min(6, "Пароль должен быть не меньше 6 символов"),

  agree: z
    .boolean({
      invalid_type_error: "Необходимо согласиться",
      required_error: "Необходимо согласиться",
    })
    .refine((val) => val, { message: "Необходимо согласиться" }),
});
