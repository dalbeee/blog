import AdminLayout from "../../../components/admin/Layout";
import PlugInHome from "../../../components/admin/plugin/PlugInHome";
import AuthRouter from "../../../components/core/router/AuthRouter";

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
