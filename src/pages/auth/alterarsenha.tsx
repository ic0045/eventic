import { NextPage } from "next";
import styles from "./alterarsenha.module.css";
import { Grid, CircularProgress, Modal, Box, Typography } from "@mui/material";
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
  const [wasSenhaAlterada, setWasSenhaAlterada] = useState(false);

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

    RecuperarSenhaAPI.alterarSenha({
      senha: formInstance.getValue("senha") as string,
      id: recover as string,
    })
      .catch((e) => {
        setIsAlterarSenhaSuccess(false);
      })
      .then((resOK) => {
        if(resOK){
          setIsAlterarSenhaSuccess(true);
          setWasSenhaAlterada(true);
        }else{
          setIsAlterarSenhaSuccess(false);
          setFormErrorMessage("Houve um erro ao alterar a senha.")
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const redirectoToLogin = () => {
    router.push("/auth/login");
  };

  const modalBoxStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className={styles.recuperarsenha}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="center"
        justifyContent="center"
      >
        <Modal open={wasSenhaAlterada} onClose={redirectoToLogin}>
          <Box sx={modalBoxStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Senha alterada
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Realize o login com a nova senha
            </Typography>
          </Box>
        </Modal>
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
