import { z } from "zod";

const cardRegExp = new RegExp(/^[0-9]{16}$/);
const cvvRegExp = new RegExp(/^[0-9]{3}$/);
const dateRegExp = new RegExp(/^[0-9]{4}$/);

export const formOrderSchema = z.object({
  // CONTACT INFORMATION SCHEMA
  firstName: z.string().min(1, "Пожалуйста, укажите имя"),
  lastName: z.string().min(1, "Пожалуйста, укажите фамилию"),
  email: z.string().email("Некорректная почта"),

  //   ADDRESS SCHEMA
  street: z.string().min(1, "Пожалуйста, укажите улицу"),
  city: z.string().min(1, "Пожалуйста, укажите город"),
  zipCode: z.string().min(6, "Пожалуйста, укажите почтовый индекс").max(6),

  //   CARD PAYMENT SCHEMA
  card: z
    .string()
    .min(16, "Пожалуйста, введите номер карты")
    .max(16)
    .regex(cardRegExp, "Некорректный номер карты"),
  date: z
    .string()
    .min(4, "Пожалуйста, введите дату")
    .regex(dateRegExp, "Некорректная дата")
    .max(4),
  cvc: z
    .string()
    .min(3, "Пожалуйста, введите код безопасности")
    .regex(cvvRegExp, "Некорректный код")
    .max(3),
});
