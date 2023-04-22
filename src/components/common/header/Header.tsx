import styles from "./header.module.css";
import { FunctionComponent } from "react";
import Image from "next/image";
import { Button, makeStyles } from "@mui/material";

export const Header: FunctionComponent = () => {
  const isLogado = true;

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Image
          src="/logo.png"
          alt="logo"
          width="0"
          height="0"
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className={styles.header__session}>
        {isLogado ? (
          <div className={styles.header__usuario}>
            <Image
              src="/avatar.png"
              alt="avatar"
              width="30"
              height="30"
              style={{ borderRadius: "5rem", marginRight: "0.5rem"}}
            />
            <p>Cristhian Carvalho</p>
          </div>
        ) : (
          <div className={styles.header__login}>
            <Button variant="contained" color="success">
              Login
            </Button>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#76D104",
                marginLeft: "0.5rem",
              }}
            >
              Cadastro
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
