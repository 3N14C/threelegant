import { axiosInstance } from "@/config/axios-config";
import { User } from "@prisma/client";

export const UserService = {
  getByUsername: async ({
    username,
    currentUserId,
  }: {
    username: string;
    currentUserId: string;
  }) => {
    const reponse = await axiosInstance.get<User[]>("/user/get-by-username", {
      params: { username, currentUserId },
    });

    return reponse.data;
  },
};
