import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import { FormFieldState } from "@app/interfaces/form_interfaces";
import {
  Grid,
  CircularProgress,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import styles from "./cadastrousuario.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "@app/components/common/layout/Layout";
import { CadastroUsuarioForm } from "@app/components/cadastrousuarioform/CadastroUsuarioForm";
import { UsuarioAPI } from "@app/apis/UsuarioAPI";
import { toBase64 } from "@app/helpers/Helpers";

const CadastroUsuario: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState('')
  const session = useSession();
  const router = useRouter();
  const [cadastroSuccess, setCadastroSuccess] = useState(true);

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

  let formFields: Map<string, FormFieldState> = new Map([
    [
      "nome",
      {
        value: "",
        validators: [Validator.required],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "sobrenome",
      {
        value: "",
        validators: [Validator.required],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "email",
      {
        value: "",
        validators: [Validator.required, Validator.email],
        valid: true,
        errorMessage: "",
      },
    ],
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
      "celular",
      {
        value: "",
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "cpf",
      {
        value: "",
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "imagem",
      {
        value: undefined,
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ]
  ]);

  const [formState, setFormState] = useState(formFields);
  const formInstance = new CustomForm(formState, setFormState);

  const redirectoToLogin = () => {
    router.push("/login");
  };
  const onCadastroSubmit = async (e: Event) => {
    if (!formInstance.validateForm()) {
      return;
    }

    setIsLoading(true);
    setCadastroSuccess(true);

    const fotoPerfil = formInstance.getValue("imagem");
    let base64: string = "";

    if(fotoPerfil){
      base64 = await toBase64(formInstance.getValue("imagem") as File) as string;
    }

    UsuarioAPI.cadastrar({
      primeiro_nome: formInstance.getValue("nome") as string,
      segundo_nome: formInstance.getValue("sobrenome") as string,
      email: formInstance.getValue("email") as string,
      senha: formInstance.getValue("senha") as string,
      permissao: "visitante",
      fotoPerfil: base64 as string
    })
      .catch((error) => {
        setCadastroSuccess(false);
        setFormErrorMessage(error.response.data.errorMsg);
      })
      .then((response) => {
        if (response) {
          setOpenModal(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className={styles.cadastro}>
        <div>
          <Modal open={openModal} onClose={redirectoToLogin}>
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Validação de e-mail
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Valide sua usando o link que enviamos para o seu e-mail.
              </Typography>
            </Box>
          </Modal>
        </div>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={0}>
            <div className={styles.imagem}>
              <Image
                src="/amico.png"
                alt="login"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "70%", height: "auto" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.cadastro__form}>
              <h2>Cadastrar Usuario</h2>
              {isLoading ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <CadastroUsuarioForm
                  isCadastroSuccess={cadastroSuccess}
                  onCadastroSubmit={onCadastroSubmit}
                  formInstance={formInstance}
                  errorMessage={formErrorMessage}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CadastroUsuario;
