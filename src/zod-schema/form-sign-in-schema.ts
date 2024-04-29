import { z } from "zod";

export const formSignInSchema = z.object({
  emailOrUsername: z.union([
    z.string().email('Некорректная почта'),
    z.string().min(1, "Имя пользователя не может быть пустым"),
  ]),
  password: z.string().min(6, "Пароль должен быть не меньше 6 символов"),
});
