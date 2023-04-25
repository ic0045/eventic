import { Alert, Button, TextField } from "@mui/material"
import styles from './loginform.module.css'
import Link from "next/link"
import { CustomForm } from "@app/helpers/CustomForm"
import { FunctionComponent } from "react"

interface LoginFormProps {
    formInstance: CustomForm
    isLoginSuccess: boolean;
    onLoginSubmit: any
     
}

 const LoginForm: FunctionComponent<LoginFormProps> = (props: LoginFormProps) => {

    return (
        <>
        {
            !props.isLoginSuccess && <Alert severity="error">E-mail e/ou senha inválidos</Alert>
        }
            <div className={styles.login}> 
                <TextField error={!props.formInstance.isValid("email")} id="email" label="E-mail" value={props.formInstance.getValue('email')} onChange={props.formInstance.onInputChange} helperText={props.formInstance.getErrorMessage('email')} /> 
                <TextField error={!props.formInstance.isValid("senha")} type="password" label="Senha" id="senha" value={props.formInstance.getValue('senha')} onChange={props.formInstance.onInputChange} helperText={props.formInstance.getErrorMessage('senha')} />
                <Button variant="contained" color="success" onClick={props.onLoginSubmit}>Login</Button>
                <Link href="/recuperarsenha">Esqueceu sua senha?</Link>
            </div>
        </>
    )
} 

export default LoginForm;