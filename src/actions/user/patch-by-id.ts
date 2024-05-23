import { axiosInstance } from "@/config/axios-config";
import { updateProfileSchema } from "@/zod-schema/form-update-profile-schema";
import { User } from "@prisma/client";
import { z } from "zod";

export const updateUserById = async (
  data: z.infer<typeof updateProfileSchema> & { userId: string }
) => {
  const response = await axiosInstance.patch<User>(
    `/user/update/${data.userId}`,
    data
  );

  return response.data;
};
