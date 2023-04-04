import { Button, TextField } from "@mui/material"
import styles from './loginform.module.css'
import { FunctionComponent } from "react"

export const LoginForm: FunctionComponent = () => {

    return (
        <>
            <div></div>
            <div className={styles.login}>
                <TextField required id="email" label="E-mail" />
                <TextField required type="password" label="Senha" id="senha" />
                <Button variant="contained" color="success">Login</Button>
                <a href="#">Esqueceu sua senha?</a>
            </div>
        </>
    )
} 