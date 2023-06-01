import { GetServerSideProps, NextPage } from "next";
import styles from "./alterarsenha.module.css";

import { Layout } from "@app/components/common/layout/Layout";
import { Box, Button, Typography } from "@mui/material";

import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from 'next/image';

interface User {
  id: string;
  primeiroNome: string;
  segundoNome: string;
  email: string;
  // celular: string;
  // cpf: string;
}

const initialState: User = {
  id: '',
  primeiroNome: '',
  segundoNome: '',
  email: '',
  // celular: '',
  // cpf: '',
};

function MeuCadastro() {


  const [data, setData] = useState<User>(initialState);

  useEffect(() => {
    const fetchData = async () => {
      const api = process.env.NEXT_PUBLIC_URL;
      const res = await fetch(`${api}/api/usuarios/perfil`);
      const fetchedData = await res.json();
      setData(fetchedData as User);
    };

    fetchData();
  }, []);


  const { data: session, status } = useSession()
  let defaultImage = "/images/userDefault.jpeg"
  const imagemPrincipal = '';

  const handleErro = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };

  return (
    <>
      <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
        <Typography mb={5} variant="h3">Meus Cadastro</Typography>
        <Box sx={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
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

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box mb={2}>
              <Typography mb={1} variant="h6">{`Nome: ${data.primeiroNome} ${data.segundoNome}`}</Typography>
              <Typography mb={1} variant="h6">{`Email: ${data.email}`}</Typography>
              {/* <Typography mb={1} variant="h6">{`Celular: ${data.celular ? data.celular : 'Não informado'}`}</Typography>
              <Typography variant="h6">{`Cpf: ${data.cpf ? data.cpf : 'Não informado'}`}</Typography> */}
            </Box>
            <Box sx={{ marginTop: 'auto' }}>
              <Link href='/auth/cadastro' style={{ marginRight: '1rem' }}>
                <Button variant="contained" color="primary" >
                  Editar Cadastro
                </Button>
              </Link>
              <Link href='/auth/alterarsenha' >
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