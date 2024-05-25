import { axiosInstance } from "@/config/axios-config";
import { User } from "@prisma/client";

interface IBlockUser {
  userId: string;
  isBlocked: boolean;
}

export const blockUserById = async ({ userId, isBlocked }: IBlockUser) => {
  const response = await axiosInstance.patch<User>(
    `user/block-by-id?userId=${userId}`,
    {
      isBlocked,
    }
  );

  return response.data;
};
