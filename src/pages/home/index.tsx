import styles from './home.module.css'
import Navbar from "@app/components/common/navbar/Navbar";
import { Box, Container, Grid, FormControl, InputLabel, MenuItem, TextField, InputAdornment, Button, IconButton } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EventList from "@app/components/eventlist";
import EventCard from "@app/components/eventcard";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment';


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

interface EventoPorSemana {
    nome: string;
    eventos: Evento[];
  }

export default function Home({ data }: { data: Evento[] }) {

    // Ordena os eventos por data
    data = data.sort((a, b) =>
        new Date(a.dataInicial).getTime() -
        new Date(b.dataInicial).getTime()
    );

    // Separando os eventos em dois arrays: um para as datas que já passaram e outro para as novas datas
    const eventosAntigos: Evento[] = data.filter(evento => new Date(evento.dataInicial).getTime() < Date.now());
    const eventosNovos: Evento[] = data.filter(evento => new Date(evento.dataInicial).getTime() >= Date.now());

    function separaEventosSemana(eventos: Evento[]) {
        const eventosPorSemana: Array<EventoPorSemana>  = [];

        eventos.forEach((evento) => {
            const semana = moment(evento.dataInicial).week();
            const dataInicioSemana = moment(evento.dataInicial).startOf('week').format('D [de] MMMM');
            const dataFimSemana = moment(evento.dataInicial).add(6, 'days').format('D [de] MMMM');
            const nomeSemana = `Semana de ${dataInicioSemana} a ${dataFimSemana}`;

            if (!eventosPorSemana[semana]) {
                eventosPorSemana[semana] = {
                    nome: nomeSemana,
                    eventos: []
                };
            }
            eventosPorSemana[semana].eventos.push(evento);
        });

        return eventosPorSemana
    }

    function separaEventosMes(eventos: Evento[]) {
        const eventosPorMes: Array<EventoPorSemana> = []

        eventos.forEach((evento) => {
            const mes = moment(evento.dataInicial).month();

            const nomeMes = moment(evento.dataInicial).format('MMMM YYYY');

            if (!eventosPorMes[mes]) {
                eventosPorMes[mes] = {
                    nome: nomeMes,
                    eventos: [],
                };
            }
            eventosPorMes[mes].eventos.push(evento);
        });
        return eventosPorMes
    }

    const eventosPorDiaAnteriores = [{ nome: '', eventos: [...eventosAntigos] }]
    const eventosPorDiaNovos = [{ nome: '', eventos: [...eventosNovos] }]

    const eventosPorSemanaAnteriores = separaEventosSemana(eventosAntigos)
    const eventosPorSemanaNovos = separaEventosSemana(eventosNovos)

    const eventosPorMesAnteriores = separaEventosMes(eventosAntigos)
    const eventosPorMesNovos = separaEventosMes(eventosNovos)


    const cards2 = [
        { id: 0, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 1, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 2, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 3, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 4, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 5, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
    ]

    const cards1 = [
        { id: 1, image: "/images/evento2.jpeg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 0, image: "/images/evento2.jpeg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 2, image: "/images/evento2.jpeg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 3, image: "/images/evento2.jpeg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 4, image: "/images/evento2.jpeg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 5, image: "/images/evento2.jpeg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
    ]

    const [period, setPeriod] = useState('1');
    const [category, setCategory] = useState('1');


    const [listView, setListView] = useState(false)

    const [value, setValue] = useState('1')

    const [eventToMapOld, setEventToMapOld] = useState(eventosPorDiaAnteriores)
    const [eventToMapNew, setEventToMapNew] = useState(eventosPorDiaNovos)

    function handlePeriodChange(event: SelectChangeEvent) {
        const evento = event.target.value
        setPeriod(event.target.value)
        if (evento == '3') {
            setEventToMapOld(eventosPorMesAnteriores);
            setEventToMapNew(eventosPorMesNovos);
        }
        if (evento == '2') {
            setEventToMapOld(eventosPorSemanaAnteriores);
            setEventToMapNew(eventosPorSemanaNovos);
        }
        if (evento == '1') {
            setEventToMapOld(eventosPorDiaAnteriores);
            setEventToMapNew(eventosPorDiaNovos);
        }

    }


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }



    return (
        <Container maxWidth="xl">

            <Navbar />

            <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <TextField

                    fullWidth
                    placeholder='Pesquisar eventos e atividades'
                    id="input-with-icon-textfield"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </Box>

            <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <Box mb={2} sx={{ display: 'flex' }}>
                    <Typography sx={{ marginRight: 'auto' }} variant="h3">Eventos</Typography>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-label">Período</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={period}
                            label="Período"
                            onChange={handlePeriodChange}
                        >
                            <MenuItem value={1}>Dia</MenuItem>
                            <MenuItem value={2}>Semana</MenuItem>
                            <MenuItem value={3}>Mês</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 150, marginRight: '2rem' }}>
                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Categoria"
                            onChange={(event: SelectChangeEvent) => (setCategory(event.target.value))}
                        >
                            <MenuItem value={1}>Evento</MenuItem>
                            <MenuItem value={2}>Atividade</MenuItem>
                            <MenuItem value={3}>Palestra</MenuItem>
                        </Select>
                    </FormControl>

                    <ViewModuleIcon onClick={() => setListView(false)} sx={{ color: 'black', opacity: listView ? 0.5 : 1, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'gray' : 'black', borderRadius: '4px' }} fontSize="large" />

                    <ViewListIcon onClick={() => setListView(true)} sx={{ color: 'black', opacity: listView ? 1 : 0.5, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'black' : 'gray', borderRadius: '4px' }} fontSize="large" />

                </Box>
                <Box>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange}>
                                <Tab label='Anteriores' value='0'></Tab>
                                <Tab label='Próximos' value='1'></Tab>
                            </TabList>

                        </Box>

                        <TabPanel value='0'>

                            {eventToMapOld.map((eventosDaSemana) =>
                                <>
                                    {listView ?
                                        <>
                                            {cards1.map((card) =>
                                                <EventList key={card.id} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                            )}
                                        </> :
                                        <>
                                            <Typography variant="h5" mt={8} mb={3}>{eventosDaSemana.nome}</Typography>

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                                {eventosDaSemana.eventos.map((card: Evento) =>

                                                    <EventCard key={card.id} finalDate={card.datafinal} linkMoreInformation={card.linkMaisInfomacoes} description={card.descricao} image={card.imagemUrl} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial} />
                                                )}
                                            </Box>
                                        </>
                                    }
                                </>
                            )}


                        </TabPanel>

                        <TabPanel value='1'>

                            {eventToMapNew.map((eventosDaSemana) =>
                                <>
                                    {listView ?
                                        <>
                                            {cards1.map((card) =>
                                                <EventList key={card.id} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                            )}
                                        </> :
                                        <>
                                            <Typography variant="h5" mt={8} mb={3}>{eventosDaSemana.nome}</Typography>

                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                                                {eventosDaSemana.eventos.map((card: Evento) =>

                                                    <EventCard key={card.id} finalDate={card.datafinal} linkMoreInformation={card.linkMaisInfomacoes} description={card.descricao} image={card.imagemUrl} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial} />
                                                )}
                                            </Box>
                                        </>
                                    }
                                </>
                            )}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Container>

    )
}

export async function getServerSideProps() {
    const api = process.env.PUBLIC_URL
    const res = await fetch(`${api}/api/eventos`)
    const data = await res.json()
    return {
        props: {
            data,
        },
    }
}
