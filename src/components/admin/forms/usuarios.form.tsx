import {
    BooleanField, Datagrid, DateField, List, TextField, SimpleForm, SimpleList,
    TextInput, CreateButton, DateInput, EditButton, BooleanInput, Edit, Create, DeleteButton, RadioButtonGroupInput, email, required, minLength, maxLength, regex
} from 'react-admin';
import { Theme, useMediaQuery } from '@mui/material';
import { Permissao } from '@app/common/constants';
import { Regex } from '@app/helpers/Helpers';

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
        <RadioButtonGroupInput fullWidth source="permissao"
            choices={Object.keys(Permissao).map((v, i) => ({ id: v, name: Object.values(Permissao)[i] }))}
            validate={[required()]}
        />
        <TextInput  type="tel" fullWidth source="celular" validate={[minLength(11), maxLength(11), regex(Regex.celular, 'Celular Inválido')]} />
        <TextInput fullWidth source="cpf" validate={[minLength(11), maxLength(11), regex(Regex.cpf, 'CPF Inválido')]} />
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