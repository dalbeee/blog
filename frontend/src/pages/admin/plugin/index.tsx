import dynamic from "next/dynamic";

const AdminLayout = dynamic(() => import("../../../components/admin/Layout"));
const PlugInHome = dynamic(
  () => import("../../../components/admin/plugin/PlugInHome")
);
const AuthRouter = dynamic(
  () => import("../../../components/core/router/AuthRouter")
);

const index = () => {
  return (
    <>
      <AuthRouter role="admin">
        <AdminLayout>
          <PlugInHome />
        </AdminLayout>
      </AuthRouter>
    </>
  );
};

export default index;
