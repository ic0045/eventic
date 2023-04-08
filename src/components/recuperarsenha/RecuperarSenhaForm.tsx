import { Button, TextField } from "@mui/material"
import styles from './recuperarsenhaform.module.css'
import { FunctionComponent, useEffect, useState } from "react"
import {Validator} from '../../helpers/Validator'
import { FormFieldState } from "@/interfaces/form_interfaces"
import { CustomForm } from "@/helpers/CustomForm"

export const RecuperarSenhaForm: FunctionComponent = () => {

    let formFields: Map<string, FormFieldState> = new Map([
        ['email', {
            value: '',
            validators: [Validator.required, Validator.email],
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

    return(
        <div className={styles.recuperarsenha}>
            <TextField error={!formInstance.isValid("email")} id="email" label="E-mail" value={formInstance.getValue('email')} onChange={formInstance.onInputChange} helperText={formInstance.getErrorMessage('email')} />
            <Button variant="contained" color="success" onClick={onLoginSubmit}> Recuperar senha </Button>
        </div>
    )
}