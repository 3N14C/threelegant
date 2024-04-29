import { NextPage } from "next";
import { Title } from "../_components/ui/title";
import { Subtitle } from "../_components/ui/subtitle";
import { FormSignUp } from "./_components/form-sign-up";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div className="flex flex-col gap-[25px]">
      <Title title="Создать аккаунт" />

      <Subtitle
        title="Уже есть аккаунт?"
        linkTitle="Войти"
        href="/auth/sign-in"
      />

      <div className="">
        <FormSignUp />
      </div>
    </div>
  );
};

export default Page;
