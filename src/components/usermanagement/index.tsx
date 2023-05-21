import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "@app/components/common/navbar/Navbar";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Link from "next/link";
import { useState } from "react";

const users = [
    {
        id: 0,
        nome: 'Diego Carapiá',
        email: 'diegocarapia@hotmail.com',
        celular: '(71) 99376-5678',
        tipo: 'visitante',
    },
    {
        id: 1,
        nome: 'Diego Carapiá',
        email: 'diegocarapia@hotmail.com',
        celular: '(71) 99376-5678',
        tipo: 'visitante',
    },
    {
        id: 2,
        nome: 'Diego Carapiá',
        email: 'diegocarapia@hotmail.com',
        celular: '(71) 99376-5678',
        tipo: 'visitante',
    },
]

const user = {
    "id": "17c8818e-a7f3-4b40-a7ea-1a6c16d29e57",
    "primeiroNome": "Gregour",
    "segundoNome": "Mazour",
    "email": "gMazour@gmail.com",
    "celular": null,
    "senha": "$2b$10$T.8QNWcMvlXEG2rTHCMJr.pCPrztqAeKmAUQT5DJ0m6e.X/Rr.6vC",
    "permissao": "visitante",
    "fotoPerfil": null,
    "cpf": null,
    "createdAt": "2023-04-08T23:35:34.941Z",
    "updatedAt": null,
    "emailConfirmado": false
}




export default function UserManagement() {

    const [user, setUser] = useState('1');

    return (
        <Container maxWidth="xl">
            <Navbar />


            <Box mb={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ m: 1, minWidth: 150 }}>
                    <InputLabel id="demo-simple-select-label">Usuários</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user}
                        label="Usuários"
                        onChange={(event: SelectChangeEvent) => (setUser(event.target.value))}
                    >
                        <MenuItem value={1}>Visitantes</MenuItem>
                        <MenuItem value={2}>Administradores</MenuItem>
                    </Select>
                </FormControl>

                <Link href='/auth/cadastro'>
                    <Button variant="contained" sx={{ backgroundColor: "#76D104", marginLeft: "0.5rem" }}>
                        Cadastro
                    </Button>
                </Link>
            </Box>


            <Box sx={{ marginBottom: '1rem', borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 1 }}>
                <TextField

                    fullWidth
                    placeholder='Nome'
                    id="input-with-icon-textfield"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }} >Nome</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Email</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Celular</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Tipo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="right">Ações</TableCell>
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
                                <TableCell align="right">{
                                    <>
                                        <IconButton sx={{ color: '#00B03B' }} aria-label="edit">
                                            <EditIcon fontSize='small' />
                                        </IconButton>
                                        <IconButton sx={{ color: '#FF2A31' }} aria-label="delete">
                                            <DeleteIcon fontSize='small' />
                                        </IconButton>
                                    </>
                                }</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}