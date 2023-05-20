import { ApiResource } from '@app/helpers/enums';
import { Theme, useMediaQuery } from '@mui/material';
import { BooleanField, Datagrid, DateField, List,  TextField, BooleanInput, DateInput, Edit, SimpleForm, TextInput, Create, UrlField, ReferenceField, ReferenceInput, SimpleList } from 'react-admin';


export const EventoList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <List title="Listar Eventos">
          {isSmall ? (
            <SimpleList
              primaryText={(record) => record.titulo}
              secondaryText={(record) => record.dataInicial}
              tertiaryText={(record) => record.datafinal}
            />
          ) : (
            <Datagrid rowClick="edit">
                <ReferenceField source="categoria.id" reference={ApiResource.CATEGORIAS} label="Categoria" />
                <TextField source="titulo" />
                <TextField source="descricao" />
                <DateField source="dataInicial" />
                <DateField source="datafinal" label="Data Final"/>
                <TextField source="localizacao" label="Localização" />
                <BooleanField source="destaque" label="Destaque?"  />
            </Datagrid>
          )}
        </List>

    );
}
export const EventoEdit = () => (
    <Edit title={"Editar Evento"}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="categoria.id" reference={ApiResource.CATEGORIAS}  label="Categoria" />
            <TextInput source="descricao" />
            <TextInput source="localizacao" />
            <DateInput source="dataInicial" />
            <TextInput source="titulo" />
            <BooleanInput source="destaque" />
            <TextInput source="imagemUrl" />
            <DateInput source="datafinal"  required={false}  label="Data Final"/>
            <UrlField source="linkImagem" />
            <UrlField source="linkTitulo" />
            <TextInput source="tipo" />
            <UrlField source="linkMaisInformacoes" />
        </SimpleForm>
    </Edit>
);

export const EventoCreate = () => (
    <Create title={"Criar Evento"}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput source="categoria.id" reference={ApiResource.CATEGORIAS}  />
            <TextInput source="descricao" />
            <TextInput source="localizacao" />
            <DateInput source="dataInicial" />
            <TextInput source="titulo" />
            <BooleanInput source="destaque" />
            <TextInput source="imagemUrl" />
            <DateInput source="datafinal" />
            <UrlField source="linkImagem" />
            <UrlField source="linkTitulo" />
            <TextInput source="tipo" />
            <UrlField source="linkMaisInformacoes" />
        </SimpleForm>
    </Create>
);