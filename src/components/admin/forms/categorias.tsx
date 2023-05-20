import { Theme, useMediaQuery } from '@mui/material';
import {
    Datagrid, List, TextField, Edit, SimpleForm, TextInput,
    Create, CreateButton, EditButton, SimpleList, ImageField
} from 'react-admin';
export const CategoriaList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <List title={"Lista Categoria"}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.nome}
                    secondaryText={(record) => record.icone}

                />
            ) : (
                <Datagrid rowClick="edit">
                    <TextField source="nome" />
                    <ImageField source="icone" />
                </Datagrid>
            )}
        </List>
    );
}
export const CategoriaEdit = () => (
    <Edit title={"Editar Categoria"} actions={<EditButton title='Editar' />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="nome" />
            <TextInput source="icone" />
        </SimpleForm>
    </Edit>
);
export const CategoriaCreate = () => (
    <Create title={"Criar Categoria"} actions={<CreateButton title='Criar' />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="nome" />
            <TextInput source="icone" />
        </SimpleForm>
    </Create>
);