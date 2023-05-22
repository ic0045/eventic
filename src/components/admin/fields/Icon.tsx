import { Icon } from "@mui/material";
import { useRecordContext } from "react-admin";

const RAIcon = ({ source }:{ source:any }) => {
  const record = useRecordContext();
  if (!record) return null;
  return <Icon>{record[source]}</Icon> ;
};

export default RAIcon;