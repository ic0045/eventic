import styles from "./header.module.css";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import AccountMenu from "../accountmenu/AccountMenu";

export const Header: FunctionComponent = () => {
  const { data: session, status } = useSession();
  const { asPath } = useRouter();

  const isPage = (pageName: string): boolean => {
    return asPath === `/${pageName}`;
  };
  
  return (
    <Box sx={{ display: "flex",flexWrap:'wrap', marginTop: "1rem",  }}>
      <Link href="/eventos">
        <Image width={300} height={80} src={"/images/logo.png"} alt="logo" />
      </Link>
      <Link href="https://computacao.ufba.br/" target={"_blank"}>
        <Image width={90} height={80} src={"/images/icLogoPequeno.png"} alt="logo Ic" />
      </Link>
      <Box sx={{ marginLeft: "auto", alignSelf: "center" }}>
        {status == 'authenticated' && session ? (
          <AccountMenu session={session} />
        ) : (
          <div className={styles.header__login}>
            {!isPage("login") && (
              <Button variant="contained" color={"secondary"} href="/auth/login">
                Login
              </Button>
            )}
            {!isPage("cadastrousuario") && (
              <Button
                variant="contained"
                style={{
                  marginLeft: "0.5rem",
                }}
                href="/auth/cadastro"
              >
                Cadastre-se
              </Button>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};
