import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, defaultTheme } from 'react-admin';
import ClientDataProvider from "@app/services/clientdataprovider.service";
import { CategoriaEdit, CategoriaList, CategoriaCreate } from "@app/components/admin/forms/categorias.form";
import CategoriaIcone from "@mui/icons-material/CategoryRounded";
import UsuarioIcone from "@mui/icons-material/PersonSearchRounded";
import EventoIcone from "@mui/icons-material/EventRounded";
import InscricaoIcone from "@mui/icons-material/SubscriptionsRounded";
import { Dashboard } from "./dashboard";
import { EventoCreate, EventoEdit, EventoList } from "./forms/eventos.form";
import { UsuarioList, UsuarioEdit, UsuarioCreate } from "./forms/usuarios.form";
import { ApiResource } from "@app/common/constants";
import { InscricaoCreate, InscricaoEdit, InscricaoList } from "./forms/inscricoes.form";
import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { MyLayout } from "./mylayout";
import tema from "../common/tema";

const messages:any = {
  'pt-br': ptBrMessages,
};
const i18nProvider = polyglotI18nProvider((locale:any) => messages[locale], 'pt-br');

const myTheme = {
  ...defaultTheme,
  ...tema
};
const AdminPortal = () => (
  <Admin theme={myTheme} i18nProvider={i18nProvider} layout={MyLayout} dataProvider={ClientDataProvider} dashboard={Dashboard}  >
    <Resource name={ApiResource.CATEGORIAS} recordRepresentation="nome"  list={CategoriaList} edit={CategoriaEdit}  create={CategoriaCreate} icon={CategoriaIcone} />
    <Resource name={ApiResource.USUARIOS} recordRepresentation="primeiroNome" list={UsuarioList} edit={UsuarioEdit} create={UsuarioCreate} icon={UsuarioIcone} />
    <Resource name={ApiResource.EVENTOS} recordRepresentation={(r)=> r.eventoTituloCompleto} list={EventoList} edit={EventoEdit} create={EventoCreate}  icon={EventoIcone} />
    <Resource name={ApiResource.INSCRICOES} list={InscricaoList} edit={InscricaoEdit} create={InscricaoCreate} icon={InscricaoIcone} />
  </Admin>
);


export default AdminPortal;