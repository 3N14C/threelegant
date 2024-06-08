"use client";

import { getCurrentSession } from "@/actions/user/currentSession";
import { getAllUsers } from "@/actions/user/get-all";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link } from "next-view-transitions";
import { FC } from "react";
import { UserSearch } from "./user-search";
import { parseAsString, useQueryState } from "nuqs";
import { useSession } from "@/hooks/use-current-session";
import { UserService } from "@/actions/user/user-service";

export const UsersList: FC = () => {
  const [username] = useQueryState("username", parseAsString);
  const { user } = useSession();

  const { data: users, isLoading } = useQuery({
    queryKey: ["get-all-users", user],
    queryFn: async () => {
      return user && (await getAllUsers({ currentUserId: user?.id }));
    },
  });

  const { data: filteredUsers } = useQuery({
    queryKey: ["filtered-users", username, user],
    queryFn: () =>
      user &&
      UserService.getByUsername({
        username: username as string,
        currentUserId: user.id ?? "",
      }),
  });

  return (
    <div className="">
      <p className="font-semibold text-xl">Пользователи</p>

      <Dialog>
        <DialogTrigger className="mt-2">
          <div className="flex flex-col gap-5 items-start border border-primary rounded-lg max-w-fit p-4">
            {users
              ?.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <Avatar className="w-[80px] h-[80px]">
                    <AvatarImage src={"/"} />
                    <AvatarFallback className="bg-zinc-300">
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <p className="font-semibold text-lg">{user.username}</p>
                </div>
              ))
              .slice(0, 4)}
          </div>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Все пользователи</DialogTitle>
          </DialogHeader>

          <ScrollArea
            className={cn("", {
              "lg:h-[400px]": users && users.length > 7,
            })}
          >
            <div className="flex flex-col gap-4">
              <UserSearch />
              {username ? (
                filteredUsers?.map((user) => (
                  <Link
                    href={`/user-profile/${user.id}`}
                    className="flex items-center gap-2"
                  >
                    <Avatar>
                      <AvatarImage src={"/"} />
                      <AvatarFallback className="bg-zinc-300">
                        {user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <p className="font-semibold text-lg">{user.username}</p>
                  </Link>
                ))
              ) : (
                <>
                  {users?.map((user) => (
                    <Link
                      href={`/user-profile/${user.id}`}
                      className="flex items-center gap-2"
                    >
                      <Avatar>
                        <AvatarImage src={"/"} />
                        <AvatarFallback className="bg-zinc-300">
                          {user.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <p className="font-semibold text-lg">{user.username}</p>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
