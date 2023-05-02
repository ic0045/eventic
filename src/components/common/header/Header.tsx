import styles from "./header.module.css";
import { FunctionComponent, useState } from "react";
import Image from "next/image";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header: FunctionComponent = () => {
  const { data: session } = useSession();
  const [elementoPopver, setElementoPopover] =
    useState<HTMLImageElement | null>(null);
  const { asPath } = useRouter();

  const isPage = (pageName: string): boolean => {
    return asPath === `/${pageName}`;
  };

  const handleAvatarClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ): void => {
    setElementoPopover(event.currentTarget);
  };

  const handleClose = (): void => {
    setElementoPopover(null);
  };

  const handleDesconectarClick = () => {
    signOut();
    handleClose();
  }

  const open = Boolean(elementoPopver);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width="0"
            height="0"
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
      </div>
      <div className={styles.header__session}>
        {session ? (
          <div className={styles.header__usuario}>
            <Image
              src={session.user.fotoPerfil ?? "/avatar.png"}
              alt="avatar"
              width="30"
              height="30"
              style={{ borderRadius: "5rem", marginRight: "0.5rem" }}
              onClick={handleAvatarClick}
            />
            {`${session.user.primeiroNome} ${session.user.segundoNome}`}
            <Popover
              id={id}
              open={open}
              anchorEl={elementoPopver}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <List component="div" role="group">
                <ListItem
                  button
                  divider
                  aria-haspopup="true"
                  aria-controls="ringtone-menu"
                  aria-label="phone ringtone"
                  onClick={handleDesconectarClick}
                >
                  <ListItemText primary="Desconectar" />
                </ListItem>
              </List>
            </Popover>
          </div>
        ) : (
          <div className={styles.header__login}>
            {!isPage("login") && (
              <Button variant="contained" color="success" 
              href="/login">
                Login
              </Button>
            )}
            {!isPage("cadastrousuario") && (
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#76D104",
                  marginLeft: "0.5rem",
                }}
                href="/cadastrousuario"
              >
                Cadastre-se
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
