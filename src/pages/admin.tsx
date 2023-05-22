import { Permissao } from "@app/common/constants";
import type { NextPage } from "next";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const AdminPortal = dynamic(() => import("../components/admin/AdminPortal"), { ssr: false });

const Home: NextPage = () => {
  return <AdminPortal />;
};
// export const getServerSideProps = async (context: any) => {
//   const session = await getServerSession(context.req, context.res, {});
//   if(session && session.user.permissao !== Permissao.admin){
//       return {
//           props: {},
//           redirect: {
//               destination: '/?err=Forbidden',
//               permanent: false
//           }
//       }
//   }

//   return {props: {}}
// }
export default Home;