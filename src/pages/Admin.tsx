import { Outlet } from "react-router-dom";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { Helmet } from "react-helmet";

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Administration - Solar Pro</title>
      </Helmet>
      <div className="flex min-h-screen bg-gradient-to-b from-[#0B1221] to-[#1a5fb4]">
        <aside className="w-64 bg-[#0B1221]/50 backdrop-blur-md p-6 border-r border-primary/20">
          <AdminNavigation />
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Admin;