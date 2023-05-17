import { CustomForm } from "@app/helpers/CustomForm";
import { Validator } from "@app/helpers/Validator";
import { FormFieldState } from "@app/interfaces/form_interfaces";
import { Grid, CircularProgress } from "@mui/material";
import styles from "./cadastroevento.module.css";
import Image from "next/image";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "@app/components/common/layout/Layout";
import { CadastroEventoForm } from "@app/components/cadastroeventoform/CadastroEventoForm";
import { EventoAPI } from "@app/apis/EventoAPI";
import dayjs, { Dayjs } from "dayjs";
import { juntarDataHorario, toBase64 } from "@app/helpers/Helpers";

const CadastroEvento: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState("");
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
        value: dayjs(new Date()),
        validators: [Validator.date],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "horarioInicio",
      {
        value: dayjs(new Date()),
        validators: [Validator.date],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "dataFim",
      {
        value: '',
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "horarioFim",
      {
        value: '',
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "categoria",
      {
        value: "",
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ],
    [
      "tipo",
      {
        value: "",
        validators: [],
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
    [
      "imagem",
      {
        value: undefined,
        validators: [],
        valid: true,
        errorMessage: "",
      },
    ],
  ]);

  const [formState, setFormState] = useState(formFields);
  const [cadastroSuccess, setCadastroSuccess] = useState(true);

  const formInstance = new CustomForm(formState, setFormState);

  const onCadastroSubmit = async (e: Event) => {
    if (!formInstance.validateForm()) {
      console.log(formState);
      return;
    }

    setIsLoading(true);

    const imagem = formInstance.getValue("imagem");
    let base64: string = "";

    if(imagem){
      base64 = await toBase64(formInstance.getValue("imagem") as File) as string;
    }

    EventoAPI.cadastrar({
      titulo: formInstance.getValue("titulo") as string,
      tipo: formInstance.getValue("tipo") as string,
      descricao: formInstance.getValue("titulo") as string,
      localizacao: formInstance.getValue("local") as string,
      data_inicial: juntarDataHorario(
        formInstance.getValue("dataInicio") as Dayjs,
        formInstance.getValue("horarioInicio") as Dayjs
      ).toISOString(),
      usuario_id: session.data?.user.id ?? "1",
      imagem: base64 as string,
    })
      .catch((error) => {
        setFormErrorMessage(error.response.data.errorMsg);
        setIsLoading(false);
      })
      .then((response) => {
        if (response) {
          router.push("/home");
        }
      });

  };

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
              <h2>Cadastrar Evento</h2>
              {isLoading ? (
                <div className="loader">
                  <CircularProgress />
                </div>
              ) : (
                <CadastroEventoForm
                  errorMessage={formErrorMessage}
                  isCadastroSuccess={cadastroSuccess}
                  onCadastroSubmit={onCadastroSubmit}
                  formInstance={formInstance}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default CadastroEvento;
