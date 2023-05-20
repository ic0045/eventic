// in src/admin/App.jsx
import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import AdminDataProvider from "@app/helpers/AppDataProvider";
import { CategoriaEdit, CategoriaList, CategoriaCreate } from "@app/components/admin/forms/categorias";
import CategoriaIcone from "@mui/icons-material/CategoryRounded";
import UsuarioIcone from "@mui/icons-material/PersonSearchRounded";
import EventoIcone from "@mui/icons-material/EventRounded";
import { Dashboard } from "./DashBoard";
import { EventoCreate, EventoEdit, EventoList } from "./forms/eventos";
import { UsuarioList, UsuarioEdit, UsuarioCreate } from "./forms/usuarios";
import { ApiResource } from "@app/helpers/enums";


const AdminPortal = () => (
  <Admin dataProvider={AdminDataProvider} dashboard={Dashboard}  >
    <Resource name={ApiResource.CATEGORIAS} recordRepresentation="nome"  list={CategoriaList} edit={CategoriaEdit}  create={CategoriaCreate} icon={CategoriaIcone} />
    <Resource name={ApiResource.USUARIOS} recordRepresentation="primeiro_nome" list={UsuarioList} edit={UsuarioEdit} create={UsuarioCreate} icon={UsuarioIcone} />
    <Resource name={ApiResource.EVENTOS}list={EventoList} edit={EventoEdit} create={EventoCreate}  icon={EventoIcone} />
  </Admin>
);


export default AdminPortal;