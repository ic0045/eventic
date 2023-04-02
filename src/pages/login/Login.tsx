import { Button, TextField } from "@mui/material"
import { NextPage } from "next"
import styles from './login.module.css'

export const Login: NextPage = () => {

    return (
        <>
            <div></div>
            <div className={styles.login}>
                <TextField required id="email" label="E-mail" />
                <TextField required type="password" label="Senha" id="senha" />
                <Button variant="contained" color="success">Entrar</Button>
            </div>
        </>
    )
} 