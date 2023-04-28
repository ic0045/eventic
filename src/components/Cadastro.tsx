import { NextPage } from "next";
import styles from "./cadastro.module.css";
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
      "titulo",
      {
        value: "",
        validators: [Validator.required],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "local",
      {
        value: "",
        validators: [Validator.required],
        valid: true,
        errorMessage: "",
      },
    ],
    [
        "dataInicio",
        {
          value: new Date(),
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "horarioInicio",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "dataFim",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "horarioFim",
        {
          value: "",
          validators: [Validator.required],
          valid: true,
          errorMessage: "",
        },
      ],
      [
        "tipo",
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

  const onCadastroSubmit = (e) => {
    console.log(formInstance.getValue('titulo'));
  }


  return (
    <Layout>
      <div className={styles.cadastro}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={6} xs={0}>
            <div className={styles.imagem}>
              <Image
                src="/pana.png"
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
              <h2>Cadastro</h2>
              {isLoading ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <CadastroForm isCadastroSuccess={cadastroSuccess} onCadastroSubmit={onCadastroSubmit} formInstance={formInstance} /> 
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};
