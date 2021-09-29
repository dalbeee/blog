import Link from "next/link";
import { useUserContext } from "../store/userContext";

const UserModule = () => {
  const { userInfo, operation } = useUserContext();

  const onLogout = () => operation.logout();

  const LoggedInMenu = () => (
    <div className="flex ">
      <Link href="/create">
        <a>
          <span className="mr-4 material-icons">send</span>
        </a>
      </Link>
      <button onClick={onLogout} className="material-icons">
        logout
      </button>
    </div>
  );

  const LoggedOutMenu = () => (
    <div className="">
      <Link href="/login">
        <button className="material-icons">login</button>
      </Link>
    </div>
  );

  return (
    <div className="absolute flex items-center h-full text-2xl right-2">
      {userInfo?.username ? <LoggedInMenu /> : <LoggedOutMenu />}
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
