import { Alert, Button, TextField } from "@mui/material"
import styles from './loginform.module.css'
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react"
import {Validator} from '../../helpers/Validator'
import { FormFieldState } from "@/interfaces/form_interfaces"
import { CustomForm } from "@/helpers/CustomForm"
import { LoginAPI } from "@/apis/LoginAPI"

interface LoginFormProps {
    formInstance: CustomForm
    isLoginSuccess: boolean;
    onLoginSubmit: any
     
}

export const LoginForm: FunctionComponent<LoginFormProps> = (props: LoginFormProps) => {

    return (
        <>
        {
            !props.isLoginSuccess && <Alert severity="error">E-mail e/ou senha inválidos</Alert>
        }
            <div className={styles.login}> 
                <TextField error={!props.formInstance.isValid("email")} id="email" label="E-mail" value={props.formInstance.getValue('email')} onChange={props.formInstance.onInputChange} helperText={props.formInstance.getErrorMessage('email')} /> 
                <TextField error={!props.formInstance.isValid("senha")} type="password" label="Senha" id="senha" value={props.formInstance.getValue('senha')} onChange={props.formInstance.onInputChange} helperText={props.formInstance.getErrorMessage('senha')} />
                <Button variant="contained" color="success" onClick={props.onLoginSubmit}>Login</Button>
                <a href="/recuperarsenha">Esqueceu sua senha?</a>
            </div>
        </>
    )
} 