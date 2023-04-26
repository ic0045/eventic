import { NextPage } from "next";
import styles from "./login.module.css";
import { CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Layout } from "@app/components/common/layout/Layout";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { CadastroForm } from "./cadastro/CadastroForm";
import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import { FormFieldState } from "@app/interfaces/form_interfaces";

export const Cadastro: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  let formFields: Map<string, FormFieldState> = new Map([
    [
      "email",
      {
        value: "",
        validators: [Validator.required],
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
  ]);
  const [formState, setFormState] = useState(formFields);
  const [loginSuccess, setLoginSuccess] = useState(true);

  const formInstance = new CustomForm(formState, setFormState);


  return (
    <Layout>
      <div className={styles.login}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={0}>
            <div className={styles.imagem}>
              <Image
                src="/pana.png"
                alt="login"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.login__form}>
              <h2>Cadastro</h2>
              {isLoading ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <CadastroForm isLoginSuccess={false} onLoginSubmit={undefined} formInstance={formInstance} /> 
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
