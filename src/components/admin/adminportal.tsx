import * as React from "react";
import { Admin, Resource, ListGuesser, EditGuesser, defaultTheme } from 'react-admin';
import ClientDataProvider from "@app/services/clientdataprovider.service";
import { CategoriaEdit, CategoriaList, CategoriaCreate } from "@app/components/admin/forms/categorias.form";
import CategoriaIcone from "@mui/icons-material/CategoryRounded";
import UsuarioIcone from "@mui/icons-material/PersonSearchRounded";
import EventoIcone from "@mui/icons-material/EventRounded";
import InscricaoIcone from "@mui/icons-material/SubscriptionsRounded";
import ParametroIcone from '@mui/icons-material/SettingsSuggest';
import { EventoCreate, EventoEdit, EventoList } from "./forms/eventos.form";
import { UsuarioList, UsuarioEdit, UsuarioCreate } from "./forms/usuarios.form";
import { ApiResource } from "@app/common/constants";
import { InscricaoCreate, InscricaoEdit, InscricaoList } from "./forms/inscricoes.form";
import{ ParametroCreate, ParametroEdit, ParametroList } from "./forms/parametro.form";
import ptBrMessages from 'ra-language-pt-br';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { MyLayout } from "./mylayout";
import tema from "../common/tema";

const messages: any = {
  'pt-br': ptBrMessages,
};
const i18nProvider = polyglotI18nProvider((locale: any) => messages[locale], 'pt-br');

const myTheme = {
  ...defaultTheme,
  ...tema
};
const AdminPortal = () => (
  <Admin theme={myTheme} i18nProvider={i18nProvider} layout={MyLayout} dataProvider={ClientDataProvider}   >
    <Resource options={{ label: 'Categorias' }} name={ApiResource.CATEGORIAS} recordRepresentation="nome" list={CategoriaList} edit={CategoriaEdit} create={CategoriaCreate} icon={CategoriaIcone} />
    <Resource options={{ label: 'Usuários' }} name={ApiResource.USUARIOS} recordRepresentation={(r)=> `${r.primeiroNome} ${r.segundoNome}  (${r.email})`} list={UsuarioList} edit={UsuarioEdit} create={UsuarioCreate} icon={UsuarioIcone} />
    <Resource options={{ label: 'Eventos' }} name={ApiResource.EVENTOS} recordRepresentation={(r) => `${r.titulo} (${r.localizacao})`} list={EventoList} edit={EventoEdit} create={EventoCreate} icon={EventoIcone}  />
    <Resource options={{ label: 'Inscrições' }} name={ApiResource.INSCRICOES} list={InscricaoList} edit={InscricaoEdit} create={InscricaoCreate} icon={InscricaoIcone} />
    <Resource options={{ label: 'Parâmetros' }} name={ApiResource.PARAMETRO} list={ParametroList} edit={ParametroEdit} create={ParametroCreate} icon={ParametroIcone} />
  </Admin>
);


export default AdminPortal;