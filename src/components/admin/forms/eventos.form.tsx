import { ApiResource } from "@app/common/constants";
import { Regex } from "@app/helpers/Helpers";
import { Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { BooleanField, Datagrid, DateField, List, TextField, BooleanInput, DateInput, Edit, SimpleForm, TextInput, Create, UrlField, ReferenceField, ReferenceInput, SimpleList, EditButton, DeleteButton, TimeInput, required, minLength, regex, AutocompleteInput, SelectInput, maxLength, DateTimeInput, BulkDeleteButton, BulkUpdateButton } from 'react-admin';



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
                <Datagrid >
                    <TextField source="titulo" label="Título"  />
                    <TextField source="descricao" label="Descrição" />
                    <DateField source="dataInicial" label="Inicio" showTime />
                    <DateField source="datafinal" label="Fim" showTime/>
                    <TextField source="localizacao" label="Localização" />
                    <ReferenceField sortable={false} source="categoria.id" reference={ApiResource.CATEGORIAS} label="Categoria" />
                    <BooleanField source="destaque" label="Destaque?" />
                    <DateField source="createdAt" label="Criado em" showTime/>
                    <EditButton />
                    <DeleteButton />
                </Datagrid>
            )}
        </List>

    );
}
const AddEditForm = ({ edit }: { edit: boolean }) => (
    <SimpleForm>
        {edit && <TextInput fullWidth source="id" disabled />}
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput fullWidth source="titulo" label="Título" validate={[required(), minLength(5)]} />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput placeholder="https://www.exemplo.com.br" helperText="Link utilizado ao clicar no título." type="url" fullWidth source="linkTitulo" label="Link do Título" validate={regex(Regex.url, "Deve ser uma url válida")} />
            </Box>
        </Box>
        <TextInput fullWidth helperText="Máx: 1000 caracteres" source="descricao" multiline type="textarea" label="Descrição" validate={[required(), minLength(5) , maxLength(1000)]} />
        <ReferenceInput  source="categoria.id" reference={ApiResource.CATEGORIAS} sort={ {field: 'nome', order: 'ASC' }} >
            <SelectInput fullWidth label="Categoria" validate={[required()]}  />
        </ReferenceInput>
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <DateTimeInput fullWidth source="dataInicial" label="Início  do Evento" validate={[required()]}/>
            </Box>
             <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                <DateTimeInput fullWidth source="datafinal" required={false} label="Fim do Evento" />
            </Box>
        </Box>
        <TextInput fullWidth source="localizacao" type="address" helperText="Rua X, Bairro Y.. " label="Localização do Evento" />

        <Typography variant="h6" gutterBottom>
            Outras Informações
        </Typography>
        <BooleanInput fullWidth source="destaque" label="Colocar em Destaque?" />
        <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput placeholder="https://www.exemplo.com.br/imagem.png" helperText="Imagem que será utilizada pra representar o evento." type="url" fullWidth source="imagemUrl" label="Imagem de Capa" validate={[required(), regex(Regex.url, "Deve ser uma url válida")]} />
            </Box>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                <TextInput placeholder="https://www.exemplo.com.br" helperText="Link utilizado ao clicar na imagem." type="url" fullWidth source="linkImagem" label="Link na Imagem" validate={regex(Regex.url, "Deve ser uma url válida")} />
            </Box>
        </Box>
        <TextInput fullWidth source="tipo" label="Tipo do Evento" placeholder="aula, apresentação de seminário..." />
        <TextInput type="url" placeholder="https://www.exemplo.com.br" fullWidth source="linkMaisInformacoes" label="Link para mais informações" validate={regex(Regex.url, "Deve ser uma url válida")} />
        <ReferenceInput disabled  source="criador.id" reference={ApiResource.USUARIOS} sort={ {field: 'primeiroNome', order: 'ASC' }} >
            <SelectInput fullWidth label="Criador" validate={[required()]}  />
        </ReferenceInput>
    </SimpleForm>
)
export const EventoEdit = () => (
    <Edit title={"Editar Evento"}>
        <AddEditForm edit={true} />
    </Edit>
);

export const EventoCreate = () => (
    <Create title={"Criar Evento"}>

        <AddEditForm edit={false} />
    </Create>
);