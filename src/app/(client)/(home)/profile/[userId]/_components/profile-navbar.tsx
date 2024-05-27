"use client";

import { signOut } from "@/actions/auth/sign-out";
import { getCurrentSession } from "@/actions/user/currentSession";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "lucia";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";

type Tag = "button" | "link";

interface IPropsNAvbarComponent {
  title: string;
  tag: Tag;
  link?: {
    id: string;
    href: string;
  };

  onClick?: () => void;
}

const NavbarComponent: FC<IPropsNAvbarComponent> = ({
  title,
  tag,
  link,
  onClick,
}) => {
  const pathname = usePathname();

  if (tag === "button")
    return (
      <button
        onClick={onClick}
        className="text-lg text-[--neutral-04] tracking-wider text-left"
      >
        {title}
      </button>
    );

  if (tag === "link")
    return (
      <Link
        href={link?.href || "/"}
        className={cn("text-[--neutral-04] text-lg tracking-wider", {
          "text-primary border-b border-primary":
            link?.id && pathname.includes(link?.id),
        })}
      >
        {title}
      </Link>
    );
};

export const ProfileNavbar: FC = ({}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const parts = pathname.split("/");
  const currentPathname = parts.slice(0, -1).join("/");

  const { data: user } = useQuery({
    queryKey: ["current-session-profile"],
    queryFn: async () => {
      const { user } = await getCurrentSession();

      return user;
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-session", "current-user-session"],
      });
      router.replace("/");
    },
  });

  const handleSignOut = async () => {
    await mutateAsync();
  };

  return (
    <div className="flex flex-col gap-5">
      <NavbarComponent
        tag="link"
        title="Аккаунт"
        link={{ id: "account", href: `${currentPathname}/account` }}
      />
      <NavbarComponent
        tag="link"
        title="Заказы"
        link={{ id: "orders", href: `${currentPathname}/orders` }}
      />

      {user?.role === "ADMIN" && (
        <NavbarComponent
          tag="link"
          title="Панель управления"
          link={{
            id: "admin-panel",
            href: `/profile/${user.id}/admin-panel`,
          }}
        />
      )}

      <AlertDialog>
        <AlertDialogTrigger className="text-left">Выход</AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Вы действительно хотите выйти из аккаунта?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleSignOut}>Выйти</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
