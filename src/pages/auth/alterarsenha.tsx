import { NextPage } from "next";
import styles from "./alterarsenha.module.css";
import { Grid, CircularProgress } from "@mui/material";
import { AlterarSenhaForm } from "@app/components/alterarsenhaform";
import { Validator } from "@app/helpers/Validator";
import { useState } from "react";
import { CustomForm } from "@app/helpers/CustomForm";
import { RecuperarSenhaAPI } from "@app/apis/RecuperarSenhaAPI";
import { useRouter } from "next/router";

const AlterarSenha: NextPage = () => {
  let formInstance = new CustomForm(new Map<string, FormFieldState>, null);
  const router = useRouter();
  const { recover } = router.query;
  let formFields: Map<string, FormFieldState> = new Map([
    [
      "senha",
      {
        value: "",
        validators: [Validator.required],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "confirmacaoSenha",
      {
        value: "",
        validators: [Validator.required],
        valid: true,
        errorMessage: "",
      },
    ],
  ]);

  const [formState, setFormState] = useState(formFields);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [isAlterarSenhaSuccess, setIsAlterarSenhaSuccess] = useState(true);

  formInstance = new CustomForm(formState, setFormState);

  const onAlterarSenhaSubmit = () => {
    if(!formInstance.validateForm()){
      return false;
    }

    if(formInstance.getValue("senha") != formInstance.getValue("confirmacaoSenha")){
      setIsAlterarSenhaSuccess(false);
      setFormErrorMessage("Campo 'Confirmar senha' difere do campo 'Senha'");
      return false;
    }

    setIsLoading(true);
    setIsAlterarSenhaSuccess(true);
    console.log(recover);

    RecuperarSenhaAPI.alterarSenha({
      senha: formInstance.getValue("senha") as string,
      id: recover as string,
    })
      .catch(() => {
        setIsAlterarSenhaSuccess(false);
      })
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
      });
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
          <div className={styles.alterarsenha__form}>
            <h2>Alterar senha</h2>
            {isLoading ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <AlterarSenhaForm
                formInstance={formInstance}
                onAlterarSenhaSubmit={onAlterarSenhaSubmit}
                isFormSuccess={isAlterarSenhaSuccess}
                formErrorMessage={formErrorMessage}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default AlterarSenha;
