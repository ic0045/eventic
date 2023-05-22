import { Alert, Button, TextField } from "@mui/material";
import styles from "./alterarsenhaform.module.css";
import { FunctionComponent } from "react";
import { CustomForm } from "@app/helpers/CustomForm";

interface AlterarSenhaFormProps {
  formInstance: CustomForm;
  isFormSuccess: boolean;
  onAlterarSenhaSubmit: any;
  formErrorMessage: string;
}

export const AlterarSenhaForm: FunctionComponent<AlterarSenhaFormProps> = (
  props: AlterarSenhaFormProps
) => {
  return (
    <>
      {!props.isFormSuccess && (
        <Alert severity="error">{ props.formErrorMessage }</Alert>
      )}
      <div className={styles.alterarsenha}>
        <p>
          Digite sua nova senha
        </p>
        <TextField
          error={!props.formInstance.isValid("senha")}
          id="senha"
          label="Senha"
          type="password"
          value={props.formInstance.getValue("senha")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("senha")}
        />
                <TextField
          error={!props.formInstance.isValid("confirmacaoSenha")}
          id="confirmacaoSenha"
          label="Confirmar senha"
          type="password"
          value={props.formInstance.getValue("confirmacaoSenha")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("confirmacaoSenha")}
        />
        <Button
          variant="contained"
          color="success"
          onClick={props.onAlterarSenhaSubmit}
        >
          Alterar senha
        </Button>
      </div>
    </>
  );
};
