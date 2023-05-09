import { Box, Container } from "@mui/material";
import AccountMenu from "@app/components/common/accountmenu/AccountMenu";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "@app/components/common/navbar/Navbar";

const users = [
    {   
        id:0,
        nome:'Diego Carapiá',
        email:'diegocarapia@hotmail.com',
        celular:'(71) 99376-5678',
        tipo:'visitante',
    },
    {
        id:1,
        nome:'Diego Carapiá',
        email:'diegocarapia@hotmail.com',
        celular:'(71) 99376-5678',
        tipo:'visitante',
    },
    {
        id:2,
        nome:'Diego Carapiá',
        email:'diegocarapia@hotmail.com',
        celular:'(71) 99376-5678',
        tipo:'visitante',
    },
]


export default function UserManagement() {
    return (
        <Container maxWidth="xl">
            <Navbar/>
            <AccountMenu />

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Celular</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow
                                key={user.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.nome}
                                </TableCell>
                                <TableCell align="right">{user.email}</TableCell>
                                <TableCell align="right">{user.celular}</TableCell>
                                <TableCell align="right">{user.tipo}</TableCell>
                                <TableCell align="right">{}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}