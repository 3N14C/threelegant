"use client";

import { getCurrentSession } from "@/actions/user/currentSession";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
  const { data: user } = useQuery({
    queryKey: ["current-user-session"],
    queryFn: async () => {
      const { user } = await getCurrentSession();

      return user;
    },
  });

  return { user };
};
