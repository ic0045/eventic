import { NextPage } from "next";
import styles from "./login.module.css";
import { CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
// import { LoginAPI } from "@app/apis/LoginAPI";
import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import LoginForm from "@app/components/loginform";
import { Layout } from "@app/components/common/layout/Layout";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";


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
  const router = useRouter();
  const [formState, setFormState] = useState(formFields);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(true);

  const formInstance = new CustomForm(formState, setFormState);

  const onLoginSubmit = () => {
    if (!formInstance.validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginSuccess(true);

    signIn('credentials',{
      email: formInstance.getValue("email"),
      password: formInstance.getValue("senha"),
      redirect: false
    }).catch((error) => {
      setLoginSuccess(false);
    })
    .then((response) => {
      if(response?.error){
        setLoginErrorMessage(response?.error);
        setLoginSuccess(false);
        setIsLoading(false);
      }

      if(response?.ok){
        router.push("/eventos")
      }
    })
      
  };

  return (
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
                  formErrorMessage={loginErrorMessage}
                  onLoginSubmit={onLoginSubmit}
                  isLoginSuccess={loginSuccess}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, {});
  if(session){
      return {
          props: {},
          redirect: {
              destination: '/',
              permanent: false
          }
      }
  }

  return {props: {}}
}

export default Login