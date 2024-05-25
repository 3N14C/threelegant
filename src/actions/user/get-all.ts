import { axiosInstance } from "@/config/axios-config";
import { User } from "@prisma/client";

export const getAllUsers = async ({
  currentUserId,
}: {
  currentUserId: string;
}) => {
  const response = await axiosInstance.get<User[]>(
    `user/get-all?currentUserId=${currentUserId}`
  );

  return response.data;
};
