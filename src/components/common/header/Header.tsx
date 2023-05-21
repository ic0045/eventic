import styles from "./header.module.css";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { Box, Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import AccountMenu from "../accountmenu/AccountMenu";

export const Header: FunctionComponent = () => {
  const { data: session } = useSession();
  const { asPath } = useRouter();

  const isPage = (pageName: string): boolean => {
    return asPath === `/${pageName}`;
  };

  return (
    <Box sx={{ display: "flex", marginTop: "1rem", marginBottom: "3rem" }}>
      <Link href="/">
        <Image width={337} height={83} src={"/images/logo.png"} alt="logo" />
      </Link>
      <Box sx={{ marginLeft: "auto", alignSelf: "center" }}>
        {session ? (
          <AccountMenu session={session} />
        ) : (
          <div className={styles.header__login}>
            {!isPage("login") && (
              <Link href="/auth/login">
                <Button variant="contained" color="success">
                  Login
                </Button>
              </Link>
            )}
            {!isPage("cadastrousuario") && (
              <Link href="/auth/cadastro">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#76D104", marginLeft: "0.5rem" }}
                >
                  Cadastro
                </Button>
              </Link>
            )}
          </div>
        )}
      </Box>
    </Box>
  );
};
