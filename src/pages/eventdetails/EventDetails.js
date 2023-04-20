import { Box, Container, Grid } from "@mui/material";
import styles from './eventdetails.module.css'
import Typography from "@mui/material/Typography";

function EventDetails() {
  return (
    <Container maxWidth="xl" className={styles.mt}>
      <Typography variant="h5" mb={3}>
        PALESTRA “PESQUISA EM PSICOLOGIA ANALÍTICA: O OLHAR SIMBÓLICO NO CONTEXTO ACADÊMICO”
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <img
            className={styles.img}
            src='/images/evento1.jpg'
            alt='Evento 1'
          />
          <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white' }}>
            <Typography variant="h4" align="center" >
              151
            </Typography>
            <Typography variant="body1" gutterBottom align="center" >
              Inscritos
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8}>
          <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Descrição
            </Typography>
            <Typography variant="body1" gutterBottom>
              Na próxima segunda-feira, 10 de abril, às 13h, na sala 308 do PAF-3 da UFBA (R. Barão de Jeremoabo, s/n – Ondina), a professora e psicóloga Isis Oliveira fará uma palestra sobre o tema “Pesquisa em Psicologia Analítica: o olhar simbólico no contexto acadêmico”.
              Desenvolvida pelo psiquiatra suíço Carl Gustav Jung, inicialmente discípulo de Freud, a Psicologia Analítica aborda de igual maneira os conteúdos conscientes e inconscientes ao tratar dos processos mentais. Trabalhar sob a ótica da epistemologia junguiana é trabalhar também com conteúdos simbólicos que ressoam na subjetividade do pesquisador desde a escolha do tema da pesquisa até as suas considerações finais. Desta forma, é relevante que o pesquisador se observe e amplie o conhecimento sobre si mesmo, a fim de reconhecer os efeitos da influência da equação pessoal no campo científico e utilizar a sua subjetividade em prol do desenvolvimento da pesquisa.
              Isis Oliveira é graduada em Psicologia pela Universidade Salvador (2008), possui Mestrado e Doutorado (em Psicologia Clínica) pela Pontifícia Universidade Católica de São Paulo (2017 e 2022). Atende como psicóloga clínica no Zenklub e consultório particular, além de atuar como docente na Unijorge em Salvador.
              O evento é promovido pelos estudantes da disciplina LETA04 – Seminários de Pesquisa, dará direito a certificado de presença e será aberto ao público. Inscrições gratuitas pelo link https://forms.gle/J7zYsL1WMX3V2mHP9
            </Typography>
          </Box >

          <Box mt={3} mb={3} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem' }}>
            <Typography variant="h6" gutterBottom>
              Detalhes
            </Typography>
            <Typography variant="body2" gutterBottom>
              Início: 30 - março | 08:00
            </Typography>
            <Typography variant="body2" gutterBottom>
              Final: 31 - março | 20:00
            </Typography>
            <Typography variant="body2" gutterBottom>
              Local: Instituto de Geociências da UFBA
            </Typography>
            <Typography variant="body2" gutterBottom>
              Mais informacoes: <a href="https://sites.google.com/view/shctbr?pli=1">https://sites.google.com/view/shctbr?pli=1</a> 
            </Typography>
          </Box>

        </Grid>
      </Grid>

    </Container>
  );
};

export default EventDetails;