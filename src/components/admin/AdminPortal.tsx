import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import ClientDataProvider from "@app/services/clientdataprovider.service";
import { CategoriaEdit, CategoriaList, CategoriaCreate } from "@app/components/admin/forms/categorias.form";
import CategoriaIcone from "@mui/icons-material/CategoryRounded";
import UsuarioIcone from "@mui/icons-material/PersonSearchRounded";
import EventoIcone from "@mui/icons-material/EventRounded";
import InscricaoIcone from "@mui/icons-material/SubscriptionsRounded";
import { Dashboard } from "./DashBoard";
import { EventoCreate, EventoEdit, EventoList } from "./forms/eventos.form";
import { UsuarioList, UsuarioEdit, UsuarioCreate } from "./forms/usuarios.form";
import { ApiResource } from "@app/common/constants";


const AdminPortal = () => (
  <Admin dataProvider={ClientDataProvider} dashboard={Dashboard}  >
    <Resource name={ApiResource.CATEGORIAS} recordRepresentation="nome"  list={CategoriaList} edit={CategoriaEdit}  create={CategoriaCreate} icon={CategoriaIcone} />
    <Resource name={ApiResource.USUARIOS} recordRepresentation="primeiro_nome" list={UsuarioList} edit={UsuarioEdit} create={UsuarioCreate} icon={UsuarioIcone} />
    <Resource name={ApiResource.EVENTOS} list={EventoList} edit={EventoEdit} create={EventoCreate}  icon={EventoIcone} />
    <Resource name={ApiResource.INSCRICOES} list={ListGuesser} edit={EditGuesser} icon={InscricaoIcone} />
  </Admin>
);


export default AdminPortal;