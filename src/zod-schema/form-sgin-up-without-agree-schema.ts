import { formSignUpSchema } from "./form-sign-up-schema";

export const formSignUpWithoutAgree = formSignUpSchema.omit({ agree: true });
