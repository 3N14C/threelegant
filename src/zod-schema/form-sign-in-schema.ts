import { z } from "zod";

export const formSignInSchema = z.object({
  email: z.string().email("Некорректная почта"),
  password: z.string().min(6, "Пароль должен быть не меньше 6 символов"),
});
