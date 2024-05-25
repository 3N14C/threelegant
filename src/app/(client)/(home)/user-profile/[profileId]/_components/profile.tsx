"use client";

import { blockUserById } from "@/actions/user/block-by-id";
import { getUserById } from "@/actions/user/get-by-id";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { toast } from "sonner";

interface IProps {
  profileId: string;
}

const tableNames = [
  {
    id: "name",
    name: "Имя",
  },

  {
    id: "username",
    name: "Пользовательское имя",
  },

  {
    id: "email",
    name: "Почтовый адрес",
  },
];

export const Profile: FC<IProps> = ({ profileId }) => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile-by-id"],
    queryFn: async () => await getUserById({ profileId }),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: blockUserById,
    onSuccess: () => {
      refetch();
    },
  });

  const handleBlock = async () => {
    if (user?.isBlocked) {
      await mutateAsync({ userId: profileId, isBlocked: false });
      toast.success("Пользователь разблокирован");
      return;
    }

    if (!user?.isBlocked) {
      await mutateAsync({ userId: profileId, isBlocked: true });
      toast.success("Пользователь заблокирован");
      return;
    }
  };

  useEffect(() => {}, [user]);

  return (
    <div className="flex items-center gap-20">
      <Avatar className="w-40 h-40">
        <AvatarImage src="/" />
        <AvatarFallback className="bg-zinc-300 text-4xl">
          {user?.username[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-grow">
        <div className="grid lg:grid-cols-2 w-1/2">
          <div className="flex flex-col gap-3">
            {tableNames.map((table) => (
              <div key={table.id} className="">
                <p className="text-[--neutral-04]">{table.name}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <p>{user?.name}</p>
            <p>{user?.username}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"destructive"} className="">
            {user?.isBlocked
              ? "Разблокировать пользователя"
              : "Заблокировать пользователя"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Вы уверены что хотите{" "}
              {user?.isBlocked ? "разблокировать" : "заблокировать"} этого
              пользователя?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {user?.isBlocked
                ? "Пользователь сможет добавлять комментарии к вашим товарам, а также совершать покупки в вашем магазине"
                : "Пользователь не сможет добавлять комментарии к вашим товарам, но по прежнему сможет совершать покупки в вашем магазине"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Отменить</AlertDialogCancel>
            <AlertDialogAction onClick={handleBlock}>Принять</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
