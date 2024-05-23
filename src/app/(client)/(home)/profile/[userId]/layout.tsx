import { FC } from "react";
import { UserAvatar } from "./_components/user-avatar";
import { ProfileNavbar } from "./_components/profile-navbar";

interface IProps {
  children: React.ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="lg:max-w-[1440px] lg:mx-auto">
      <p className="text-5xl font-medium text-center mt-20">Мой Профиль</p>

      <div className="flex items-start gap-20 mt-20">
        <div className="flex flex-col gap-10 w-2/6">
          <UserAvatar />

          <ProfileNavbar />
        </div>

        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
