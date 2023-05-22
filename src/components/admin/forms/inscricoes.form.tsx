import {
    BooleanField, Datagrid, DateField, List, TextField, SimpleForm, SimpleList,
    TextInput, CreateButton, DateInput, EditButton, BooleanInput, Edit, Create, ReferenceField, ReferenceInput, DeleteButton, RadioButtonGroupInput, required, SelectInput
} from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';
import { ApiResource, NotificarEm } from '@app/common/constants';

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
                    <Datagrid >
                        <ReferenceField sortable={false} fullWidth source="evento.id" reference={ApiResource.EVENTOS} label="Evento" />
                        <ReferenceField sortable={false} fullWidth source="usuario.id" reference={ApiResource.USUARIOS} label="Usuário" />
                        <TextField fullWidth source="notificarEm" />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>

                )
            }
        </List>
    );
};

const AddEditForm = ({ edit }: { edit: boolean }) => (
    <SimpleForm sx={{ maxWidth: 500 }}>
        {edit && <TextInput fullWidth source="id" disabled />}
        <ReferenceInput fullWidth source="evento.id" reference={ApiResource.EVENTOS} sort={ {field: 'titulo', order: 'ASC' }} >
            <SelectInput fullWidth label="Evento" validate={[required()]} />
        </ReferenceInput>
        <ReferenceInput fullWidth source="usuario.id" reference={ApiResource.USUARIOS} sort={ {field: 'primeiroNome', order: 'ASC' }} >
            <SelectInput fullWidth label="Evento" validate={[required()]} />
        </ReferenceInput>
        <RadioButtonGroupInput fullWidth source="notificarEm"
            choices={Object.keys(NotificarEm).map((v,i) => ({ id: v, name:  Object.values(NotificarEm)[i]}))}
            validate={[required()]}
        />
    </SimpleForm>
)
export const InscricaoEdit = () => (
    <Edit title={"Editar Inscrição"} actions={<EditButton title='Editar' />}>
        <AddEditForm edit />
    </Edit>
);

export const InscricaoCreate = () => (
    <Create title={"Inscrever Usuário"} actions={<EditButton title='Editar' />}>
        <AddEditForm edit={false} />
    </Create>
);