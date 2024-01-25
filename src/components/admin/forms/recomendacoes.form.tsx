import { Theme, useMediaQuery } from '@mui/material';
import { List, TextField, Datagrid, SimpleList} from 'react-admin';

export const RecomendacoesShow = () => {
    const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    return (
        <List title={"Recomendacções"}>
            {isSmall ?
                (
                    <SimpleList
                primaryText={(record) => record.id}
                secondaryText={(record) => record.total}
                tertiaryText={(record) => record.precisaoMedia}
            />
                )
                :
                (
                    <Datagrid >
                        <TextField source="id" label="Tipo" />
                        <TextField source="total" label="Total de Recomendações" />
                        <TextField source="precisaoMedia" label="Precisão Média" />
                    </Datagrid>

                )
            }
        </List>
    );
};