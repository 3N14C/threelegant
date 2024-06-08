"use client";

import { Input } from "@/components/ui/input";
import { parseAsString, useQueryState } from "nuqs";
import { FC } from "react";

export const UserSearch: FC = () => {
  const [username, setUsername] = useQueryState("username", parseAsString);

  return (
    <div className="">
      <Input
        placeholder="Поиск по имени пользователя"
        value={username ?? ""}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};
