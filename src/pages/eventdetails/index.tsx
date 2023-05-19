import { Box, Container, Grid } from "@mui/material";
import styles from './eventdetails.module.css'
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import ShareIcon from '@mui/icons-material/Share';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import { useState } from "react";
import { Layout } from "@app/components/common/layout/Layout";
import SubscribeButton from "@app/components/subscribebutton/SubscribeButton"
import Navbar from "@app/components/common/navbar/Navbar";
import { getServerSession } from "next-auth";

import { GetServerSideProps } from 'next';

import { useSearchParams } from 'next/navigation'

interface Evento {
  id: string
  descricao: string
  localizacao: string
  dataInicial: string
  titulo: string
  destaque: boolean
  imagemUrl: string
  createdAt: string
  updatedAt: string
  datafinal: string
  linkImagem: string
  linkTitulo: string
  tipo: string
  linkMaisInfomacoes: string
}

function EventDetails({ data }: { data: Evento[] }) {

  const searchParams = useSearchParams()

  const event = {
    image: "/images/evento1.jpg",
    title: "Simpósio PALESTRA “PESQUISA EM PSICOLOGIA ANALÍTICA: O OLHAR SIMBÓLICO NO CONTEXTO ACADÊMICO”",
    description: "Na próxima segunda-feira, 10 de abril, às 13h, na sala 308 do PAF-3 da UFBA (R. Barão de Jeremoabo, s/n – Ondina), a professora e psicóloga Isis Oliveira fará uma palestra sobre o tema 'Pesquisa em Psicologia Analítica: o olhar simbólico no contexto acadêmico'.Desenvolvida pelo psiquiatra suíço Carl Gustav Jung, inicialmente discípulo de Freud, a Psicologia Analítica aborda de igual maneira os conteúdos conscientes e inconscientes ao tratar dos processos mentais.Trabalhar sob a ótica da epistemologia junguiana é trabalhar também com conteúdos simbólicos que ressoam na subjetividade do pesquisador desde a escolha do tema da pesquisa até as suas considerações finais.Desta forma, é relevante que o pesquisador se observe e amplie o conhecimento sobre si mesmo, a fim de reconhecer os efeitos da influência da equação pessoal no campo científico e utilizar a sua subjetividade em prol do desenvolvimento da pesquisa.Isis Oliveira é graduada em Psicologia pela Universidade Salvador(2008), possui Mestrado e Doutorado(em Psicologia Clínica) pela Pontifícia Universidade Católica de São Paulo(2017 e 2022).Atende como psicóloga clínica no Zenklub e consultório particular, além de atuar como docente na Unijorge em Salvador.O evento é promovido pelos estudantes da disciplina LETA04 – Seminários de Pesquisa, dará direito a certificado de presença e será aberto ao público.Inscrições gratuitas pelo link https://forms.gle/J7zYsL1WMX3V2mHP9",
    start: "Início: 30 - março | 08:00",
    end: "Final: 31 - março | 20:00",
    location: "Instituto de Geociências da UFBA",
    moreInformation: "https://sites.google.com/view/shctbr?pli=1",
    numberSubs: 151
  }

  const [subscribed, setSubscribed] = useState(false)

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Jnho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  function getData(d: string,x:string) {
    if (d === null) {
      return null
    }
    const date = new Date(d)
    const day = date.getDate()
    const month = meses[date.getMonth()]
    const horario = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${x}: ${day} - ${month} | ${horario}`
  }

  return (

    <Container maxWidth="xl">
      <Navbar />
      <Typography sx={{ borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3, padding: '1rem' }} variant="h5" mb={3}>
        {data[0].titulo}
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Box sx={{ boxShadow: 0 }}>
            <Image
              height={600}
              width={600}
              className={styles.img}
              src={searchParams.get('image') || data[0].imagemUrl}
              alt='evento-imagem'
            />
          </Box>

          <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3 }}>
            <Typography variant="h4" align="center" >
              {subscribed ? event.numberSubs + 1 : event.numberSubs}
            </Typography>
            <Typography variant="body1" gutterBottom align="center" >
              Interessados
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8}>
          <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Descrição
            </Typography>
            <Typography sx={{ textAlign: 'justify' }} variant="body1" gutterBottom>
              {data[0].descricao}
            </Typography>
          </Box >

          <Box mt={3} mb={3} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
            <Typography variant="h6" gutterBottom>
              Detalhes
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getData(data[0].dataInicial,'Início')}
              <IconButton target="_blank" href="https://calendar.google.com/" aria-label="calendar">
                <EventIcon />
              </IconButton>
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getData(data[0].datafinal,'Fim')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Local: {data[0].localizacao}

              <IconButton target="_blank" href="https://www.google.com/maps/place/Instituto+de+Geoci%C3%AAncias+da+UFBA/@-12.9980058,-38.5097059,17z/data=!3m1!4b1!4m6!3m5!1s0x716049f49530915:0xeee17285dd935415!8m2!3d-12.9980058!4d-38.5071256!16s%2Fg%2F1q5bwgf_d" aria-label="location ">
                <PlaceIcon />
              </IconButton>

            </Typography>
            <Typography variant="body2" gutterBottom>
              Mais informacoes: <a href={data[0].linkMaisInfomacoes || 'www.google.com'}>{data[0].linkMaisInfomacoes}</a>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <SubscribeButton />
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>

        </Grid>
      </Grid>

    </Container>
  );
};


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = query.id;

  const api = process.env.PUBLIC_URL;
  const res = await fetch(`${api}/api/eventos?id=${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

// export const getServerSideProps = async (context: any) => {
//   const session = await getServerSession(context.req, context.res, {});
//   if(!session){
//       return {
//           props: {},
//           redirect: {
//               destination: '/login',
//               permanent: false
//           }
//       }
//   }

//   return {props: {}}
// }

export default EventDetails;