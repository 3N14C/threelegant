import { NextPage } from "next";
import { Title } from "../_components/ui/title";
import { Subtitle } from "../_components/ui/subtitle";
import { FormSignIn } from "./_components/form-sign-in";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-[25px]">
      <Title title="Вход в аккаунт" />

      <Subtitle
        title="Нет аккаунта?"
        linkTitle="Создать"
        href="/auth/sign-up"
      />

      <div className="">
        <FormSignIn />
      </div>
    </div>
  );
};

export default Page;
