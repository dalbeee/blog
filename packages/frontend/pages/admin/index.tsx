import AdminLayout from "../../component/admin/Layout";
import PlugInHome from "../../component/admin/plugin/PlugInHome";
import AuthRouter from "../../component/router/AuthRouter";

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
