import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import { FormFieldState } from "@app/interfaces/form_interfaces";
import { Grid, CircularProgress } from "@mui/material";
import styles from "./cadastrousuario.module.css";
import Image from "next/image";
import { width, height } from "@mui/system";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "@app/components/common/layout/Layout";
import { EventoAPI } from "@app/apis/EventoAPI";
import dayjs from "dayjs";
import { CadastroUsuarioForm } from "@app/components/cadastrousuarioform/CadastroUsuarioForm";
import { UsuarioAPI } from "@app/apis/UsuarioAPI";


const CadastroUsuario: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

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
          validators: [],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "senha",
        {
          value: "",
          validators: [],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "celular",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "cpf",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "cep",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "descricao",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
  ]);

  const [formState, setFormState] = useState(formFields);
  const [cadastroSuccess, setCadastroSuccess] = useState(true);

  const formInstance = new CustomForm(formState, setFormState);

  const onCadastroSubmit = (e: Event) => {

    UsuarioAPI.cadastrar({
      primeiro_nome: formInstance.getValue('nome') as string,
      segundo_nome: formInstance.getValue('sobrenome') as string,
      email: formInstance.getValue('email') as string,
      senha: formInstance.getValue('senha') as string,
      permissao: "visitante"
    }).catch((error) => {
      console.log(error)
    }).then((response) => {
      console.log(response)
      if(response){
        router.push('/login')
      }
    })
    
    console.log();
  }


  return (
    <Layout>
      <div className={styles.cadastro}>
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
                <CadastroUsuarioForm isCadastroSuccess={cadastroSuccess} onCadastroSubmit={onCadastroSubmit} formInstance={formInstance} /> 
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CadastroUsuario;