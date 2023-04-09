import { NextPage } from "next";
import styles from "./recuperarsenha.module.css";
import { CircularProgress, Grid } from "@mui/material";
import { RecuperarSenhaForm } from "@/components/recuperarsenha/RecuperarSenhaForm";
import { useState } from "react";
import { CustomForm } from "@/helpers/CustomForm";
import { Validator } from "@/helpers/Validator";
import { FormFieldState } from "@/interfaces/form_interfaces";
import { RecuperarSenhaAPI } from "@/apis/RecuperarSenhaAPI";

export const RecuperarSenha: NextPage = () => {
    let formFields: Map<string, FormFieldState> = new Map([
        ['email', {
            value: '',
            validators: [Validator.required, Validator.email],
            valid: true,
            errorMessage: ''
        }]
    ])

    const [formState, setFormState] = useState(formFields)
    const [isLoading, setIsLoading] = useState(false);
    const [isRecuperarSenhaSuccess, setIsRecuperarSenhaSuccess] = useState(true);

    const formInstance = new CustomForm(formState, setFormState);

    const onRecuperarSenhaSubmit = (e: any) => {
        if(!formInstance.validateForm()){
            return false;
        }
        setIsLoading(true);
        setIsRecuperarSenhaSuccess(true);

        RecuperarSenhaAPI.enviarLink({
            email: formInstance.getValue('email')
        }).catch((erro)=> {
            setIsRecuperarSenhaSuccess(false)
        }).then((response) => {

        }).finally(() => {
            setIsLoading(false);
        })

    }

  return (
    <div className={styles.recuperarsenha}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12} md={6}>
          <div className={styles.recuperarsenha__form}>
            <h2>Recuperar senha</h2>
            {isLoading ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <RecuperarSenhaForm formInstance={formInstance} onRecuperarSenhaSubmit={onRecuperarSenhaSubmit} isFormSuccess={isRecuperarSenhaSuccess}  />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
