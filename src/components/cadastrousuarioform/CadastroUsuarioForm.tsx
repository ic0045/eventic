import {
  Alert,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import styles from "./cadastrousuarioform.module.css";
import { CustomForm } from "@app/helpers/CustomForm";
import { FunctionComponent } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

interface CadastroUsuarioFormProps {
  formInstance: CustomForm;
  isCadastroSuccess: boolean;
  onCadastroSubmit: any;
}

export const CadastroUsuarioForm: FunctionComponent<
  CadastroUsuarioFormProps
> = (props: CadastroUsuarioFormProps) => {
  return (
    <>
      {!props.isCadastroSuccess && (
        <Alert severity="error">E-mail e/ou senha inválidos</Alert>
      )}
      <div className={styles.cadastro}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <TextField
              error={!props.formInstance.isValid("nome")}
              id="nome"
              value={props.formInstance.getValue("nome")}
              onChange={props.formInstance.onInputChange}
              helperText={props.formInstance.getErrorMessage("nome")}
              label="Nome"
              className={styles.dataInput}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              error={!props.formInstance.isValid("sobrenome")}
              id="sobrenome"
              value={props.formInstance.getValue("sobrenome")}
              onChange={props.formInstance.onInputChange}
              helperText={props.formInstance.getErrorMessage("sobrenome")}
              label="Sobrenome"
              className={styles.dataInput}
            />
          </Grid>
        </Grid>
        <TextField
          error={!props.formInstance.isValid("email")}
          id="email"
          value={props.formInstance.getValue("email")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("email")}
          label="E-mail"
        />
        <TextField
          error={!props.formInstance.isValid("senha")}
          id="senha"
          value={props.formInstance.getValue("senha")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("senha")}
          label="Senha"
          type="password"
        />
        <TextField
          error={!props.formInstance.isValid("celular")}
          id="celular"
          value={props.formInstance.getValue("celular")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("celular")}
          label="Celular"
        />
        <TextField
          error={!props.formInstance.isValid("cpf")}
          id="cpf"
          value={props.formInstance.getValue("cpf")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("cpf")}
          label="CPF"
        />
        <TextField
          error={!props.formInstance.isValid("cep")}
          id="cep"
          value={props.formInstance.getValue("cep")}
          onChange={props.formInstance.onInputChange}
          helperText={props.formInstance.getErrorMessage("cep")}
          label="CEP"
        />
        <div className={styles.data}>
          <h4>Upload de imagem</h4>
          <input type="file" className={styles.fileInput} />
        </div>
        <Button
          variant="contained"
          color="success"
          onClick={props.onCadastroSubmit}
        >
          Cadastrar
        </Button>
      </div>
    </>
  );
};
