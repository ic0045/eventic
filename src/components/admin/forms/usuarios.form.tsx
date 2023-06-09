import {
    BooleanField, Datagrid, DateField, List, TextField, SimpleForm, SimpleList,
    TextInput, CreateButton, DateInput, EditButton, BooleanInput, Edit, Create, DeleteButton, RadioButtonGroupInput, email, required, minLength, maxLength, regex
} from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';
import { Regex } from '@app/helpers/Helpers';
import { PermissaoEnum } from '@app/common/constants';

export const UsuarioList = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <List title={"Lista Usuario"}>
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
                    <Datagrid >
                        <TextField source="primeiroNome" />
                        <TextField source="segundoNome" />
                        <TextField source="email" />
                        <BooleanField source="emailConfirmado" />
                        <TextField source="permissao" />
                        <EditButton />
                        <DeleteButton />
                    </Datagrid>
                )
            }
        </List>
    );
};
const AddEditForm = ({ edit }: { edit: boolean }) => (
    <SimpleForm>
        {edit && <TextInput fullWidth source="id" disabled />}
        <TextInput fullWidth source="primeiroNome" validate={[required(), minLength(2), maxLength(15)]} />
        <TextInput fullWidth source="segundoNome" validate={[required(), minLength(2), maxLength(15)]} />
        <TextInput fullWidth source="email" validate={[required(), email()]} />
        {!edit && <TextInput fullWidth source="senha" type='password' validate={[required(), minLength(8)]} />}
        <RadioButtonGroupInput fullWidth source="permissao"
            choices={Object.keys(PermissaoEnum).map((v, i) => ({ id: v, name: Object.values(PermissaoEnum)[i] }))}
            validate={[required()]}
        />
    </SimpleForm>
)
export const UsuarioEdit = () => (
    <Edit title={"Editar Usuario"} actions={<EditButton title='Editar' />}>
        <AddEditForm edit={true} />
    </Edit>

);

export const UsuarioCreate = () => (
    <Create title={"Criar Usuario"} actions={<EditButton title='Editar' />}>
        <AddEditForm edit={false} />
    </Create>
);