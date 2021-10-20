import Link from "next/link";

import { useUser } from "../hooks/useUser";

const UserModule = () => {
  const userAPI = useUser();

  const onLogout = () => userAPI.logout();

  const LoggedInMenu = () => (
    <div className="flex ">
      <Link href="/create">
        <a>
          <span className="mr-4 material-icons-round">send</span>
        </a>
      </Link>

      <Link href="/admin">
        <a href="">
          <span className="material-icons-round mr-4">settings</span>
        </a>
      </Link>
      <button onClick={onLogout} className="material-icons-round">
        logout
      </button>
    </div>
  );

  const LoggedOutMenu = () => (
    <div className="">
      <Link href="/login">
        <button className="material-icons-round">login</button>
      </Link>
    </div>
  );

  return (
    <div className="absolute flex items-center h-full text-2xl right-2">
      {!!userAPI.getAccessToken() ? <LoggedInMenu /> : <LoggedOutMenu />}
    </div>
  );
};

const Header = () => {
  return (
    <div className="relative flex justify-center w-full h-16 item-center">
      <Link href="/">
        <button className="flex items-center text-3xl ">blog</button>
      </Link>
      <UserModule />
    </div>
  );
};

export default Header;
