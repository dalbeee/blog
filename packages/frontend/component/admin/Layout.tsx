import SideBar from "./sideBar/SideBar";

const AdminLayout = ({ children }: any) => {
  return (
    <>
      <div className="w-full min-h-content flex">
        <SideBar />
        {children ?? <div>admin page</div>}
      </div>
    </>
  );
};

export default AdminLayout;
