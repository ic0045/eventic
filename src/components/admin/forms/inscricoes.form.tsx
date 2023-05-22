import {
    BooleanField, Datagrid, DateField, List, TextField, SimpleForm, SimpleList,
    TextInput, CreateButton, DateInput, EditButton, BooleanInput, Edit, Create, ReferenceField, ReferenceInput
} from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';
import { ApiResource } from '@app/common/constants';

export const InscricaoList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <List title={"Inscrições"}>
            {isSmall ?
                (
                    <SimpleList
                        primaryText={(record) => record.usuario.primeirNome}
                        secondaryText={(record) => record.evento.titulo}
                        tertiaryText={(record) => record.notificarEm}
                    />
                )
                :
                (
                    <Datagrid rowClick="edit">
                        <ReferenceField fullWidth source="evento.id" reference={ApiResource.EVENTOS} label="Evento" />
                        <ReferenceField fullWidth source="usuario.id" reference={ApiResource.USUARIOS} label="Usuário" />
                        <TextField fullWidth source="notificarEm" />
                    </Datagrid>

                )
            }
        </List>
    );
};


export const InscricaoEdit = () => (
    <Edit title={"Editar Inscrição"} actions={<EditButton title='Editar' />}>
        <SimpleForm>
            <TextInput source="id" disabled />
            <ReferenceInput fullWidth source="evento.id" reference={ApiResource.EVENTOS} label="Evento" />
            <ReferenceInput fullWidth source="usuario.id" reference={ApiResource.USUARIOS} label="Usuário" />
            <TextInput fullWidth source="notificarEm" />
        </SimpleForm>
    </Edit>
);

export const InscricaoCreate = () => (
    <Create title={"Inscrever Usuário"} actions={<EditButton title='Editar' />}>
        <SimpleForm>
            <TextInput fullWidth source="id" disabled />
            <ReferenceInput fullWidth source="evento.id" reference={ApiResource.EVENTOS} label="Evento" />
            <ReferenceInput fullWidth source="usuario.id" reference={ApiResource.USUARIOS} label="Usuário" />
            <TextInput fullWidth source="notificarEm" />
        </SimpleForm>
    </Create>
);