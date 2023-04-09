import { Alert, Button, TextField } from "@mui/material";
import styles from "./recuperarsenhaform.module.css";
import { FunctionComponent } from "react";
import { CustomForm } from "@/helpers/CustomForm";

interface RecuperarSenhaFormProps {
  formInstance: CustomForm;
  isFormSuccess: boolean;
  onRecuperarSenhaSubmit: any;
}

export const RecuperarSenhaForm: FunctionComponent<RecuperarSenhaFormProps> = (
  props: RecuperarSenhaFormProps
) => {
  return (
    <>
      {!props.isFormSuccess && (
        <Alert severity="error">Erro</Alert>
      )}
      <div className={styles.recuperarsenha}>
        <p>
          Insira o e-mail cadastrado na sua conta para enviarmos um link de
          redefinição de senha
        </p>
        <TextField
          error={!props.formInstance.isValid("email")}
          id="email"
          label="E-mail"
          value={props.formInstance.getValue("email")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("email")}
        />
        <Button
          variant="contained"
          color="success"
          onClick={props.onRecuperarSenhaSubmit}
        >
          Recuperar senha
        </Button>
      </div>
    </>
  );
};
