import { axiosInstance } from "@/config/axios-config";
import { Prisma } from "@prisma/client";

export const getUserById = async ({ profileId }: { profileId: string }) => {
  const response = await axiosInstance.get<
    Prisma.UserGetPayload<{ include: { order: true } }>
  >(`/user/get-by-id?profileId=${profileId}`);

  return response.data;
};
