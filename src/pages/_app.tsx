import "@app/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";
import { Layout } from "@app/components/common/layout/Layout";
import { ThemeProvider } from "@mui/material";
import tema from "@app/components/common/tema";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ThemeProvider theme={tema}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        localeText={
          ptBR.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
