import { Button, TextField } from "@mui/material"
import styles from './loginform.module.css'
import { FunctionComponent, useState } from "react"
import {Validator} from '../../helpers/Validator'

interface FormFieldState { value?: string; validators?: Function[]; valid?: boolean; errorMessage?: string }

export const LoginForm: FunctionComponent = () => {

    let formStateMap: Map<string, FormFieldState> = new Map([
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
    const [formState, setFormState] = useState(formStateMap)

    const validateForm = () => {
        formStateMap = new Map(formState);  
        formState.forEach((value: FormFieldState, key: string) => {
            let isValid = true;
            let errorHelperText = '';
            value.validators?.forEach((validator) => {
                const validatorResponse: {
                    isValid: boolean;
                    errorMessage: string
                } = validator(value.value);

                if(!validatorResponse.isValid){
                    isValid = false;
                    errorHelperText = validatorResponse.errorMessage;
                }
            })
            const currentValue = formState.get(key);
            formStateMap.set(key, {...currentValue, valid: isValid, errorMessage: errorHelperText})
            
        })

        setFormState(formStateMap)
    }


    const isValid = (fieldId: string): boolean => {
        return formState.get(fieldId)?.valid ?? false;
    }


    const onInputChange = (e: any) => {
        const newValue = e.target.value;
        const currentValue = formState.get(e.target.id);
        formStateMap = new Map(formState);
        formStateMap.set(e.target.id, {...currentValue, value: newValue})
        setFormState(formStateMap)
        console.log(formState)
    }

    const onLoginSubmit = (e: any) => {
        validateForm();
    }

    const getValue = (fieldId: string): string => {
        return formState.get(fieldId)?.value ?? ""
    }

    const getErrorMessage = (fieldId: string): string => {
        return formState.get(fieldId)?.errorMessage ?? ""
    } 

    return (
        <>
            <div className={styles.login}> 
                <TextField error={!isValid("email")} id="email" label="E-mail" value={formState.get('email')?.value} onChange={onInputChange} helperText={getErrorMessage('email')} /> 
                <TextField error={!isValid("senha")} type="password" label="Senha" id="senha" value={getValue('senha')} onChange={onInputChange} helperText={getErrorMessage('senha')} />
                <Button variant="contained" color="success" onClick={onLoginSubmit}>Login</Button>
                <a href="#">Esqueceu sua senha?</a>
            </div>
        </>
    )
} 