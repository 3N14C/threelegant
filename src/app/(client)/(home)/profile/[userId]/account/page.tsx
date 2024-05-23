import { NextPage } from "next";
import { UserAvatar } from "../_components/user-avatar";
import { FormUpdateAccount } from "./_components/form-update-account";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return (
    <div>
      <FormUpdateAccount />
    </div>
  );
};

export default Page;
