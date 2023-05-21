import { BooleanField, Datagrid, DateField, List, TextField, SimpleForm, SimpleList,
    TextInput, CreateButton, DateInput, EditButton, BooleanInput, Edit, Create  } from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';

export const UsuarioList = () => {
    const isSmall = useMediaQuery((theme : Theme) => theme.breakpoints.down("sm"));
    return (
        <List title={"Inscrições"}>
            {isSmall ? 
                (
                    <SimpleList
                    primaryText={(record) => record.primeiroNome}
                    secondaryText={(record) => record.email}
                    tertiaryText={(record) => record.permissao}
                    />
                ) 
                : 
                (
                <Datagrid rowClick="edit">
                    <TextField source="primeiroNome" />
                    <TextField source="segundoNome" />
                    <TextField source="email" />
                    <BooleanField source="emailConfirmado" />
                    <TextField source="celular" />
                    <TextField source="cpf" />
                    <TextField source="permissao" />
                </Datagrid>
                )
            }
        </List>
    );
};

export const UsuarioEdit = () => (
    <Edit title={"Editar Usuario"} actions={<EditButton title='Editar'/>}>
        <SimpleForm>
            <TextInput source="primeiroNome" />
            <TextInput source="segundoNome" />
            <TextInput source="email" />
            <TextInput source="permissao" />
            <BooleanInput source="emailConfirmado" disabled/>
            <TextInput source="celular" />
            <TextInput source="cpf" />
        </SimpleForm>
    </Edit>
);

export const UsuarioCreate = () => (
    <Create title={"Criar Usuario"} actions={<EditButton title='Editar'/>}>
        <SimpleForm>
            <TextInput source="primeiroNome" />
            <TextInput source="segundoNome" />
            <TextInput source="email" />
            <TextInput source="permissao" />
            <BooleanInput source="emailConfirmado" disabled/>
            <TextInput source="celular" />
            <TextInput source="cpf" />
        </SimpleForm>
    </Create>
);