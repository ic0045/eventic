import { NextPage } from "next";
import styles from "./login.module.css";
import { CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import { LoginAPI } from "@app/apis/LoginAPI";
import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import { FormFieldState } from "@app/interfaces/form_interfaces";
import LoginForm from "@app/components/loginform";
import { Layout } from "@app/components/common/layout/Layout";
import Image from "next/image";

const Login: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  const onLoginSubmit = () => {
    if (!formInstance.validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginSuccess(true);

    LoginAPI.login({
      email: formInstance.getValue("email"),
      password: formInstance.getValue("senha"),
    })
      .catch(() => {
        setLoginSuccess(false);
      })
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Layout>
      <div className={styles.login}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={0}>
            <div className={styles.imagem}>
              <Image
                src="/login.png"
                alt="login"
                width="0"
                height="0"
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={styles.login__form}>
              <h2>Login</h2>
              {isLoading ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <LoginForm
                  formInstance={formInstance}
                  onLoginSubmit={onLoginSubmit}
                  isLoginSuccess={loginSuccess}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Login