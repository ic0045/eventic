import { Box, Button, Container, Grid, Tooltip,SvgIcon } from "@mui/material";
import styles from './detalhes.module.css'
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import ShareIcon from '@mui/icons-material/Share';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect, useState } from "react";
import SubscribeButton from "@app/components/subscribebutton/SubscribeButton"
import ShareButton from "@app/components/sharebutton/ShareButton"
import Navbar from "@app/components/common/navbar/Navbar";
import { getServerSession } from "next-auth";

import { SiGooglecalendar } from 'react-icons/si';

import { GetServerSideProps } from 'next';

import { useSearchParams } from 'next/navigation'

import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

import MyIcon from './logoCalendar.svg';

const CustomIcon = (props: React.ComponentProps<typeof SvgIcon>) => (
  <SvgIcon {...props}>
    <MyIcon />
  </SvgIcon>
);

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
  tipo: string
  linkMaisInformacoes: string
  qtInscricoes: number
}

function EventDetails({ data }: { data: Evento[] }) {

  const [isLoading, setIsLoading] = useState(false);

  const handleLinkClick = () => {
    setIsLoading(true);
  };

  const searchParams = useSearchParams()

  // const event = {
  //   image: "/images/evento1.jpg",
  //   title: "Simpósio PALESTRA “PESQUISA EM PSICOLOGIA ANALÍTICA: O OLHAR SIMBÓLICO NO CONTEXTO ACADÊMICO”",
  //   description: "Na próxima segunda-feira, 10 de abril, às 13h, na sala 308 do PAF-3 da UFBA (R. Barão de Jeremoabo, s/n – Ondina), a professora e psicóloga Isis Oliveira fará uma palestra sobre o tema 'Pesquisa em Psicologia Analítica: o olhar simbólico no contexto acadêmico'.Desenvolvida pelo psiquiatra suíço Carl Gustav Jung, inicialmente discípulo de Freud, a Psicologia Analítica aborda de igual maneira os conteúdos conscientes e inconscientes ao tratar dos processos mentais.Trabalhar sob a ótica da epistemologia junguiana é trabalhar também com conteúdos simbólicos que ressoam na subjetividade do pesquisador desde a escolha do tema da pesquisa até as suas considerações finais.Desta forma, é relevante que o pesquisador se observe e amplie o conhecimento sobre si mesmo, a fim de reconhecer os efeitos da influência da equação pessoal no campo científico e utilizar a sua subjetividade em prol do desenvolvimento da pesquisa.Isis Oliveira é graduada em Psicologia pela Universidade Salvador(2008), possui Mestrado e Doutorado(em Psicologia Clínica) pela Pontifícia Universidade Católica de São Paulo(2017 e 2022).Atende como psicóloga clínica no Zenklub e consultório particular, além de atuar como docente na Unijorge em Salvador.O evento é promovido pelos estudantes da disciplina LETA04 – Seminários de Pesquisa, dará direito a certificado de presença e será aberto ao público.Inscrições gratuitas pelo link https://forms.gle/J7zYsL1WMX3V2mHP9",
  //   start: "Início: 30 - março | 08:00",
  //   end: "Final: 31 - março | 20:00",
  //   location: "Instituto de Geociências da UFBA",
  //   moreInformation: "https://sites.google.com/view/shctbr?pli=1",
  //   numberSubs: 151
  // }

  const [subscribed, setSubscribed] = useState(false)

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  function getData(d: string, x: string) {
    if (d === null) {
      return null
    }
    const date = new Date(d)
    const day = date.getDate()
    const month = meses[date.getMonth()]
    const year = date.getFullYear()
    const horario = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return `${x}: ${day} de ${month} de ${year} | ${horario}`
  }

  let defaultImage = "/images/default.png"
  const imagemPrincipal = data[0]?.imagemUrl || '';

  const handleErro = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = defaultImage;
  };

  const dataInicialOriginal = moment(data[0].dataInicial)
  const dataInicial = dataInicialOriginal.format('YYYYMMDDTHHmmssZ')

  const dataFinalOriginal = moment(data[0].datafinal)
  const dataFinal = dataFinalOriginal.format('YYYYMMDDTHHmmssZ')

  const addAgenda = `
  https://calendar.google.com/calendar/u/0/r/eventedit?
  &text=${data[0].titulo}
  &dates=${dataInicial}/${dataFinal}
  &details=${encodeURIComponent(data[0].descricao)}
  &location=${data[0].localizacao}
  `

  // Roda a roda de loading enquanto espera carrega o estado do evento, se esta ou nao inscrito
  const [isLoadingSubButton, setIsLoadingSubButton] = useState(false);

  // Controla a lista de eventos inscritos
  let [idIncricoes, setIdIncricoes] = useState<string[]>([])
  const getUserEvents = async () => {
    setIsLoadingSubButton(true)
    const api = process.env.NEXT_PUBLIC_URL;

    // Pega os Eventos do usuário
    const res = await fetch(`${api}/api/usuarios/eventos`);
    const data: Promise<Evento[] | { errorMsg: string }> = await res.json();


    let listId: string[] = []
    if (Array.isArray(data)) {
      listId = data.map(evento => evento.id)
    }
    setIdIncricoes(listId)
    setIsLoadingSubButton(false)
  };

  useEffect(() => {
    getUserEvents()
  }, []);


  return (

    <Box mt={5}>
      {isLoading ? <CircularProgress sx={{ marginBottom: '1rem' }} size={32}/> :
        <Link href='/eventos'>
          <Button onClick={handleLinkClick} sx={{ marginBottom: '1rem' }} startIcon={<ArrowBackIcon />}>
            Voltar
          </Button>
        </Link>
      }
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
              src={imagemPrincipal}
              alt='evento-imagem'
              unoptimized
              onError={handleErro}
            />
          </Box>

          <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3 }}>
            <Typography variant="h4" align="center" >
              {subscribed ? data[0].qtInscricoes + 1 : data[0].qtInscricoes}
            </Typography>
            <Typography variant="body1" gutterBottom align="center" >
              Interessado(s)
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
              {getData(data[0].dataInicial, 'Início')}
              <Tooltip title="Adicionar a agenda">
                <IconButton target="_blank" href={addAgenda} aria-label="calendar">
                  {/* <EventIcon /> */}
                  {/* <SiGooglecalendar size={20} /> */}
                  {/* <LogoCalendar/> */}
                  {/* <img src="/images/logoCalendar.svg" alt="Meu ícone" /> */}
                  <CustomIcon/>
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography variant="body2" gutterBottom>
              {getData(data[0].datafinal, 'Fim')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Local: {data[0].localizacao}
              <Tooltip title="Ver no mapa">
                <IconButton target="_blank" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data[0].localizacao)}`} aria-label="location ">
                  <PlaceIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            {data[0].linkMaisInformacoes ?
              <Typography variant="body2" gutterBottom>
                Mais informacões: <a target="_blank" href={data[0].linkMaisInformacoes || 'www.google.com'}>{data[0].linkMaisInformacoes}</a>
              </Typography> : <></>
            }

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {new Date(data[0].dataInicial).getTime() >= Date.now() && (isLoadingSubButton ? <CircularProgress size={28} /> : <SubscribeButton eventoId={data[0].id} inscrito={idIncricoes.includes(data[0].id)} />)}
              <ShareButton url={process.env.NEXT_PUBLIC_URL + "/eventos/detalhes?id=" + data[0].id} />
            </Box>
          </Box>

          <Box mt={3} mb={3} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3906.14853818059!2d-49.10173628769766!3d-11.754584536484774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x933e94c651c4f4a1%3A0x718556ca934e3cde!2sR.%20Jos%C3%A9%20Paf%2C%20123%2C%20Gurupi%20-%20TO%2C%2077420-040!5e0!3m2!1spt-BR!2sbr!4v1685713259469!5m2!1spt-BR!2sbr"
              style={{ width: '100%', height: '300px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> */}

            <iframe
              src={`https://maps.google.com/maps?&q=${encodeURIComponent(data[0].localizacao)}&output=embed`}
              style={{ width: '100%', height: '300px' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe> 
          </Box>
        </Grid>
      </Grid>

    </Box>
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
//               destination: '/auth/login',
//               permanent: false
//           }
//       }
//   }

//   return {props: {}}
// }

export default EventDetails;