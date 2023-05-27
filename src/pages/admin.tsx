import type { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import { redirectIfNotAuthorized } from "./api/auth/auth";

const AdminPortal = dynamic(() => import("../components/admin/adminportal"), { ssr: false });

const Home: NextPage = () => {
  return <AdminPortal />;
};
export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  return await redirectIfNotAuthorized(req, res, 'admin')
}
export default Home;