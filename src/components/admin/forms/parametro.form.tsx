import { Icon, Theme, useMediaQuery } from '@mui/material';
import {
    Datagrid, List, TextField, Edit, SimpleForm, TextInput,
    Create, CreateButton, EditButton, SimpleList, ImageField, SelectInput, DeleteButton
} from 'react-admin';
import RAIcon from '../fields/Icon';
import SelectIconInput from '../fields/SelectIconInput';

export const ParametroList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <List title={"Lista Parametro"}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record) => record.nome}
                    secondaryText={(record) => record.valor}

                />
            ) : (
                <Datagrid>
                    <TextField source="nome" />
                    <TextField source="valor" />
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            )}
        </List>
    );
}

const AddEditForm = ({ edit }: { edit: boolean }) => (
    <SimpleForm sx={{ maxWidth: 500 }}>
        {edit && <TextInput fullWidth source="id" disabled />}
        <TextInput source="nome" fullWidth />
        <SelectIconInput source="icone" />
    </SimpleForm>
)
export const ParametroEdit = () => (
    <Edit title={"Editar Parametro"} actions={<EditButton title='Editar' />}>
        <AddEditForm edit />
    </Edit>
);
export const ParametroCreate = () => (
    <Create title={"Criar Parametro"} actions={<CreateButton title='Criar' />}>
        <AddEditForm edit={false} />
    </Create>
);