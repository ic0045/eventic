import { NextPage } from "next";
import styles from "./alterarsenha.module.css";

import { Layout } from "@app/components/common/layout/Layout";
import { Box, Button, Typography } from "@mui/material";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image';

const MeuCadastro: NextPage = () => {

  const { data: session, status } = useSession()

  let defaultImage = "/images/userDefault.jpeg"
  const imagemPrincipal = session?.user.fotoPerfil || '';

  const handleErro = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <>
      <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
        <Typography mb={5} variant="h3">Meus Cadastro</Typography>
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Image
            style={{
              height: 'auto',
              maxWidth: '100%',
              objectFit: 'contain'
            }}
            height={250}
            width={250}
            className={styles.img}
            src={imagemPrincipal}
            alt='evento-imagem'
            unoptimized
            onError={handleErro}
          />

          <Box sx={{display:'flex',flexDirection:'column'}}>
            <Typography mb={2}  variant="h6">Nome: {session?.user.primeiroNome} {session?.user.segundoNome}</Typography>
            <Typography variant="h6">Email: {session?.user.email}</Typography>
            <Box sx={{marginTop:'auto'}}>
              <Link href='/auth/cadastro' style={{ marginRight: '1rem' }}>
                <Button variant="contained" color="primary" >
                  Editar Cadastro
                </Button>
              </Link>
              <Link href='/auth/cadastro'>
                <Button variant="contained" color="secondary" >
                  Alterar Senha
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>

      </Box>

    </>
  );
};
export default MeuCadastro;