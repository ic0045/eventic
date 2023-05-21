import type { NextPage } from "next";
import dynamic from "next/dynamic";

const AdminPortal = dynamic(() => import("../components/admin/AdminPortal"), { ssr: false });

const Home: NextPage = () => {
  return <AdminPortal />;
};

export default Home;