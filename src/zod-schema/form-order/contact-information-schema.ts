import { z } from "zod";

export const contactInformationSchema = z.object({
  firstName: z.string().min(1, "Пожалуйста, укажите имя"),
  lastName: z.string().min(1, "Пожалуйста, укажите фамилию"),
  email: z.string().email("Некорректная почта"),
});
