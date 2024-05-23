import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "Имя не может быть пустым"),
  username: z.string().min(1, "Имя пользователя не может быть пустым"),
  email: z.string().email("Некорректная почта"),

  oldPassword: z.string().min(6, "Пароль должен быть не меньше 6 символов"),
  newPassword: z.string().min(6, "Пароль должен быть не меньше 6 символов"),
});
