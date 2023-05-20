import styles from './home.module.css'
import Navbar from "@app/components/common/navbar/Navbar";
import { Box, Container, Grid, FormControl, InputLabel, MenuItem, TextField, InputAdornment, Button, IconButton, Paper, InputBase } from "@mui/material";
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
import CircularProgress from '@mui/material/CircularProgress';


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

interface EventoPorPeriodo {
    nome: string;
    eventos: Evento[];
}

interface Categoria {
    id: string
    nome: string
    icone: string
}

export default function Home({ data, categorias }: { data: Evento[], categorias: Categoria[] }) {



    function separaEventosPorPeriodo(eventos: Evento[], periodo: 'semana' | 'mes') {
        const eventosPorPeriodo: Array<EventoPorPeriodo> = [];

        eventos.forEach((evento) => {
            let periodoIndex: number;
            let nomePeriodo: string;

            if (periodo === 'semana') {
                periodoIndex = moment(evento.dataInicial).week();
                const dataInicioSemana = moment(evento.dataInicial).startOf('week').format('D [de] MMMM');
                const dataFimSemana = moment(evento.dataInicial).add(6, 'days').format('D [de] MMMM');
                nomePeriodo = `Semana de ${dataInicioSemana} a ${dataFimSemana}`;
            } else if (periodo === 'mes') {
                periodoIndex = moment(evento.dataInicial).month();
                nomePeriodo = moment(evento.dataInicial).format('MMMM YYYY');
            } else {
                throw new Error('Período inválido. Escolha entre "semana" e "mes".');
            }

            if (!eventosPorPeriodo[periodoIndex]) {
                eventosPorPeriodo[periodoIndex] = {
                    nome: nomePeriodo,
                    eventos: [],
                };
            }
            eventosPorPeriodo[periodoIndex].eventos.push(evento);
        });

        return eventosPorPeriodo;
    }


    function organizaEventos(eventos: Evento[]) {

        // Ordena os eventos por data
        eventos = eventos.sort((a, b) =>
            new Date(a.dataInicial).getTime() -
            new Date(b.dataInicial).getTime()
        );
        // Separando os eventos em dois arrays: um para as datas que já passaram e outro para as novas datas
        const eventosAntigos: Evento[] = eventos.filter(evento => new Date(evento.dataInicial).getTime() < Date.now());
        const eventosNovos: Evento[] = eventos.filter(evento => new Date(evento.dataInicial).getTime() >= Date.now());

        let eventosPorDiaAnteriores = [{ nome: '', eventos: [...eventosAntigos] }]
        let eventosPorDiaNovos = [{ nome: '', eventos: [...eventosNovos] }]

        let eventosPorSemanaAnteriores = separaEventosPorPeriodo(eventosAntigos, 'semana');
        let eventosPorSemanaNovos = separaEventosPorPeriodo(eventosNovos, 'semana');

        let eventosPorMesAnteriores = separaEventosPorPeriodo(eventosAntigos, 'mes');
        let eventosPorMesNovos = separaEventosPorPeriodo(eventosNovos, 'mes');

        return [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos]
    }

    const eventosOrganizados = organizaEventos(data)
    let [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = eventosOrganizados

    const [category, setCategory] = useState('Todas');
    const [period, setPeriod] = useState('1');

    const [aba, setAba] = useState('1')

    const [listView, setListView] = useState(false)

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

    function update() {
        if (period == '3') {
            setEventToMapOld(eventosPorMesAnteriores);
            setEventToMapNew(eventosPorMesNovos);
        }
        if (period == '2') {
            setEventToMapOld(eventosPorSemanaAnteriores);
            setEventToMapNew(eventosPorSemanaNovos);
        }
        if (period == '1') {
            setEventToMapOld(eventosPorDiaAnteriores);
            setEventToMapNew(eventosPorDiaNovos);
        }
    }

    function limpaBusca() {
        [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = eventosOrganizados
        update()
    }

    const events = (eventList: Array<EventoPorPeriodo>) =>
    (
        eventList.map((eventosPorPeriodo) =>
            <>
                {listView ?
                    <>
                        <Typography variant="h5" mt={8} mb={3}>{eventosPorPeriodo.nome}</Typography>
                        {eventosPorPeriodo.eventos.map((card) =>
                            <EventList key={card.id} id={card.id} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial} />
                        )}
                    </> :
                    <>
                        <Typography variant="h5" mt={8} mb={3}>{eventosPorPeriodo.nome}</Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {eventosPorPeriodo.eventos.map((card: Evento) =>

                                <EventCard key={card.id} id={card.id} image={card.imagemUrl} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial} />
                            )}
                        </Box>
                    </>
                }
            </>
        )
    )

    const [responseData, setResponseData] = useState(data);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (responseData) {
            [eventosPorDiaAnteriores, eventosPorDiaNovos, eventosPorSemanaAnteriores, eventosPorSemanaNovos, eventosPorMesAnteriores, eventosPorMesNovos] = organizaEventos(responseData)
            update()

        }
    }, [responseData]);

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true)
        const api = process.env.NEXT_PUBLIC_URL
        const res = await fetch(`${api}/api/eventos?titulo=${inputValue}`)

        const newData = await res.json();
        setResponseData(newData);
        setIsLoading(false)
    };


    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita que o evento padrão de tecla Enter ocorra
            await handleClick(); // Realiza a busca quando a tecla Enter é pressionada
        }
    };




    return (
        <Container maxWidth="xl">
            <Navbar />

            <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3 }}>
                <Paper
                    component="form"
                    sx={{ display: 'flex', alignItems: 'center', padding: '1rem', }}
                >
                    <IconButton onClick={handleClick} type="button" aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    {isLoading ? <CircularProgress /> : <></>}
                    <InputBase
                        onKeyDown={handleKeyDown}
                        onChange={(e) => { setInputValue(e.target.value) }}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Filtrar por nome de Evento"
                        inputProps={{ 'aria-label': 'busca de eventos' }}
                    />
                </Paper>
            </Box>
            <Button onClick={limpaBusca} variant="text">Limpar Busca</Button>

            <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <Box mb={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
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
                            <MenuItem value='Todas'>Todas</MenuItem>
                            {categorias.map((categoria) =>
                                <MenuItem key={categoria.id} value={categoria.nome}>{categoria.nome}</MenuItem>
                            )}
                        </Select>
                    </FormControl>

                    <ViewModuleIcon onClick={() => setListView(false)} sx={{ color: 'black', opacity: listView ? 0.5 : 1, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'gray' : 'black', borderRadius: '4px' }} fontSize="large" />

                    <ViewListIcon onClick={() => setListView(true)} sx={{ color: 'black', opacity: listView ? 1 : 0.5, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'black' : 'gray', borderRadius: '4px' }} fontSize="large" />

                </Box>
                <Box>
                    <TabContext value={aba}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={(e, newValue) => { setAba(newValue) }}>
                                <Tab label='Anteriores' value='0'></Tab>
                                <Tab label='Próximos' value='1'></Tab>
                            </TabList>

                        </Box>

                        <TabPanel value='0'>
                            {events(eventToMapOld)}
                        </TabPanel>

                        <TabPanel value='1'>
                            {events(eventToMapNew)}
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

    const resCategoria = await fetch(`${api}/api/categorias`)
    const categorias = await resCategoria.json()
    console.log(categorias)
    return {
        props: {
            data,
            categorias
        },
    }
}
