"use client";

import { useQuery } from "@tanstack/react-query";
import { RegisteredDatabaseUserAttributes } from "lucia";
import Image from "next/image";
import { FC } from "react";

export const UserAvatar: FC = () => {
  const { data: user } = useQuery<RegisteredDatabaseUserAttributes>({
    queryKey: ["current-session"],
  });

  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
        }
        alt="user avatar"
        width={1000}
        height={1000}
        className="rounded-full w-[70px] h-[70px]"
      />

      <p className="font-medium text-lg">{user?.username}</p>
    </div>
  );
};
