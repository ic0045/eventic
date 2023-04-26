import { Alert, Button, TextField } from "@mui/material"
import styles from './cadastroform.module.css'
import { CustomForm } from "@app/helpers/CustomForm"
import { FunctionComponent } from "react"

interface CadastroFormProps {
    formInstance: CustomForm
    isLoginSuccess: boolean;
    onLoginSubmit: any
     
}

export const CadastroForm: FunctionComponent<CadastroFormProps> = (props: CadastroFormProps) => {

    return (
        <>
        {
            !props.isLoginSuccess && <Alert severity="error">E-mail e/ou senha inválidos</Alert>
        }
            <div className={styles.cadastro}> 
                <TextField label="Título" />
                <TextField label="Local" />

            </div>
        </>
    )
} 