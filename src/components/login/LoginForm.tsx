import { Button, TextField } from "@mui/material"
import styles from './loginform.module.css'
import { FunctionComponent, useEffect, useState } from "react"
import {Validator} from '../../helpers/Validator'
import { FormFieldState } from "@/interfaces/form_interfaces"
import { CustomForm } from "@/helpers/CustomForm"

export const LoginForm: FunctionComponent = () => {

    let formFields: Map<string, FormFieldState> = new Map([
        ['email', {
            value: '',
            validators: [Validator.required],
            valid: true,
            errorMessage: ''
        }],
        ['senha', {
            value: '',
            validators: [Validator.required],
            valid: true, 
            errorMessage: ''
        }]
    ])
    const [formState, setFormState] = useState(formFields)

    const formInstance = new CustomForm(formState, setFormState);

    const onLoginSubmit = (e: any) => {
        if(!formInstance.validateForm()){
            return false;
        }
    }

    return (
        <>
            <div className={styles.login}> 
                <TextField error={!formInstance.isValid("email")} id="email" label="E-mail" value={formInstance.getValue('email')} onChange={formInstance.onInputChange} helperText={formInstance.getErrorMessage('email')} /> 
                <TextField error={!formInstance.isValid("senha")} type="password" label="Senha" id="senha" value={formInstance.getValue('senha')} onChange={formInstance.onInputChange} helperText={formInstance.getErrorMessage('senha')} />
                <Button variant="contained" color="success" onClick={onLoginSubmit}>Login</Button>
                <a href="#">Esqueceu sua senha?</a>
            </div>
        </>
    )
} 