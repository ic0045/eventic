import { NextPage } from "next";
import styles from "./recuperarsenha.module.css";
import { Box, CircularProgress, Grid, Modal, Typography } from "@mui/material";
import { RecuperarSenhaAPI } from "@app/apis/RecuperarSenhaAPI";
import { RecuperarSenhaForm } from "@app/components/recuperarsenhaform";
import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import { useState } from "react";
import { useRouter } from "next/router";

const RecuperarSenha: NextPage = () => {
  let formFields: Map<string, FormFieldState> = new Map([
    [
      "email",
      {
        value: "",
        validators: [Validator.required, Validator.email],
        valid: true,
        errorMessage: "",
      },
    ],
  ]);

  const style = {
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

  const [formState, setFormState] = useState(formFields);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isRecuperarSenhaSuccess, setIsRecuperarSenhaSuccess] = useState(true);
  const router = useRouter();
  const formInstance = new CustomForm(formState, setFormState);

  const redirectoToLogin = () => {
    router.push("/auth/login");
  };

  const onRecuperarSenhaSubmit = () => {
    if (!formInstance.validateForm()) {
      return false;
    }
    setIsLoading(true);
    setIsRecuperarSenhaSuccess(true);

    RecuperarSenhaAPI.enviarLink({
      email: formInstance.getValue("email") as string,
    })
      .catch(() => {
        setIsRecuperarSenhaSuccess(false);
      })
      .then(() => {
        setOpenModal(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.recuperarsenha}>
      <div>
        <Modal open={openModal} onClose={redirectoToLogin}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Recuperação de senha enviada
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Use o link enviado para o seu e-mail para recuperar sua senha.
            </Typography>
          </Box>
        </Modal>
      </div>
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
              <RecuperarSenhaForm
                formInstance={formInstance}
                onRecuperarSenhaSubmit={onRecuperarSenhaSubmit}
                isFormSuccess={isRecuperarSenhaSuccess}
              />
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default RecuperarSenha;
