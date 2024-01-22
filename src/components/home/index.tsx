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


import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';
import { setCookie, getCookie } from '@app/utils/cookieUtils';

import { criaListaCategorias } from '@app/utils/organizaEventos';
import RecommendationSection from '../recommendationSection';


export default function Home({ data, categorias, eventosCategoria, home }: { data?: Evento[], categorias?: Categoria[], eventosCategoria?: Array<EventoPorCategoria>, home: boolean }) {

    // Cria listas de eventos para cada categoria
    const listaVazia: ListaCategorias =
    {
        Todas: {
            eventosPorDiaAnteriores: [
                {
                    nome: '',
                    eventos: []
                }
            ],
            eventosPorDiaNovos: [
                {
                    nome: '',
                    eventos: []
                }
            ],
            eventosPorSemanaAnteriores: [
                {
                    nome: '',
                    eventos: []
                }
            ],
            eventosPorSemanaNovos: [
                {
                    nome: '',
                    eventos: []
                }
            ],
            eventosPorMesAnteriores: [
                {
                    nome: '',
                    eventos: []
                }
            ],
            eventosPorMesNovos: [
                {
                    nome: '',
                    eventos: []
                }
            ],
        }
    }
    // let [listaCategorias, setListaCategorias] = useState(criaListaCategorias(eventosCategoria, data));
    // const listaCategoriasBackup = criaListaCategorias(eventosCategoria, data)

    let [listaCategorias, setListaCategorias] = useState((data && categorias && eventosCategoria && home) ? criaListaCategorias(eventosCategoria, data) : listaVazia);
    const listaCategoriasBackup = (data && categorias && eventosCategoria && home) ? criaListaCategorias(eventosCategoria, data) : listaVazia


    // Controla os filtros categoria e periodo
    const [category, setCategory] = useState('Todas');
    const [period, setPeriod] = useState('1');

    // Controla a visualização lista/card
    const [listView, setListView] = useState(false)

    // Controla as abas Novos/Anteriores
    const [aba, setAba] = useState('1')
    const [eventToMapOld, setEventToMapOld] = useState(listaCategorias['Todas'].eventosPorDiaAnteriores)
    const [eventToMapNew, setEventToMapNew] = useState(listaCategorias['Todas'].eventosPorDiaNovos)

    // Controla o valor do campo de pesquisa
    const [inputValue, setInputValue] = useState('');

    // Roda a roda de loading enquanto espera o resultado da busca
    const [isLoading, setIsLoading] = useState(false);

    // Roda a roda de loading enquanto espera carrega o estado do evento, se esta ou nao inscrito
    const [isLoadingSubButton, setIsLoadingSubButton] = useState(false);

    // Loading meus eventos
    const [isLoadingMeusEventos, setIsLoadingMeusEventos] = useState(false);

    // Controla a lista de eventos inscritos
    let [idIncricoes, setIdIncricoes] = useState<string[]>([])

    // Atualiza os eventos exibidos ao pesquisar
    useEffect(() => {
        if (listaCategorias) {
            console.log(listaCategorias)
            update()
        }
    }, [listaCategorias]);

    useEffect(() => {
        if (idIncricoes) {
            console.log('carregando inscricoes')
        }
    }, [idIncricoes]);

    // Ao carregar o componente, tenta recuperar os valores das variáveis do cookie
    useEffect(() => {
        const list = getCookie('listView')
        const savedlistView = list ? JSON.parse(list) : false;

        const savedPeriod = getCookie('period');

        if (savedlistView) {
            setListView(savedlistView);
        }

        if (savedPeriod) {
            setPeriod(savedPeriod);
            update(savedPeriod)
        }
        if (!home) {
            handleUserEvents()
        }

        getUserEvents()
    }, []);

    function update(periodo: string = period) {
        if (periodo == '3') {
            setEventToMapOld(listaCategorias[category].eventosPorMesAnteriores);
            setEventToMapNew(listaCategorias[category].eventosPorMesNovos);
        }
        if (periodo == '2') {
            setEventToMapOld(listaCategorias[category].eventosPorSemanaAnteriores);
            setEventToMapNew(listaCategorias[category].eventosPorSemanaNovos);
        }
        if (periodo == '1') {
            setEventToMapOld(listaCategorias[category].eventosPorDiaAnteriores);
            setEventToMapNew(listaCategorias[category].eventosPorDiaNovos);
        }
    }

    function handlePeriodChange(event: SelectChangeEvent) {
        const evento = event.target.value
        setPeriod(event.target.value)
        if (evento == '3') {
            setEventToMapOld(listaCategorias[category].eventosPorMesAnteriores);
            setEventToMapNew(listaCategorias[category].eventosPorMesNovos);
        }
        if (evento == '2') {
            setEventToMapOld(listaCategorias[category].eventosPorSemanaAnteriores);
            setEventToMapNew(listaCategorias[category].eventosPorSemanaNovos);
        }
        if (evento == '1') {
            setEventToMapOld(listaCategorias[category].eventosPorDiaAnteriores);
            setEventToMapNew(listaCategorias[category].eventosPorDiaNovos);
        }
        setCookie('period', evento);
    }

    function handleCategoryChange(event: SelectChangeEvent) {
        const evento = event.target.value
        setCategory(evento)
        if (period == '3') {
            setEventToMapOld(listaCategorias[evento].eventosPorMesAnteriores);
            setEventToMapNew(listaCategorias[evento].eventosPorMesNovos);
        }
        if (period == '2') {
            setEventToMapOld(listaCategorias[evento].eventosPorSemanaAnteriores);
            setEventToMapNew(listaCategorias[evento].eventosPorSemanaNovos);
        }
        if (period == '1') {
            setEventToMapOld(listaCategorias[evento].eventosPorDiaAnteriores);
            setEventToMapNew(listaCategorias[evento].eventosPorDiaNovos);
        }
    }


    // Faz a busca na api 
    const handleClick = async () => {
        setIsLoading(true)

        const api = process.env.NEXT_PUBLIC_URL

        // Pega os Eventos
        const res = await fetch(`${api}/api/eventos?q=${inputValue}`)
        const data = await res.json()

        // Pega os Eventos por Categoria
        const eventosCategoria = []
        if (categorias) {
            for (const categoria of categorias) {
                const res = await fetch(`${api}/api/eventos?categoria_id=${categoria.id}&q=${inputValue}`);
                const newData = await res.json();
                eventosCategoria.push({ nome: categoria.nome, eventos: newData })
            }
        }

        setListaCategorias(criaListaCategorias(eventosCategoria, data))
        setIsLoading(false)
    };

    // Mostra somente os eventos do usuario se ele estiver na pagina Minhas inscricoes
    const handleUserEvents = async () => {
        setIsLoadingMeusEventos(true)
        const api = process.env.NEXT_PUBLIC_URL

        // Pega os Eventos do usuario
        const res = await fetch(`${api}/api/usuarios/eventos`)
        const data = await res.json()

        const eventosCategoria = [{ nome: '', eventos: [] }]

        setListaCategorias(criaListaCategorias(eventosCategoria, data))
        setIsLoadingMeusEventos(false)
    }

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


    function limpaBusca() {
        setListaCategorias(listaCategoriasBackup)
        setInputValue('')
    }

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita que o evento padrão de tecla Enter ocorra
            await handleClick(); // Realiza a busca quando a tecla Enter é pressionada
        }
    };


    const events = (eventList: Array<EventoPorPeriodo>, hasSubscribeButton: boolean) =>
    (
        eventList.map((eventosPorPeriodo) =>
            <div key={eventosPorPeriodo.nome}>
                {listView ?
                    <div key={eventosPorPeriodo.nome}>
                        <Typography variant="h5" mt={8} mb={3}>{eventosPorPeriodo.nome}</Typography>
                        {eventosPorPeriodo.eventos.map((card) =>
                            <div key={eventosPorPeriodo.nome}>
                                <EventList isLoadingSubButton={isLoadingSubButton} idIncricoes={idIncricoes} setIdIncricoes={setIdIncricoes} inscrito={idIncricoes.includes(card.id)} key={card.id} eventoId={card.id} id={card.id} subscribeButton={hasSubscribeButton} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial}  />
                            </div>
                        )}
                    </div> 
                    :
                    <div key={eventosPorPeriodo.nome}>
                        <Typography variant="h5" mt={8} mb={3}>{eventosPorPeriodo.nome}</Typography>


                        {/* Recomendações apenas para eventos futuros */}
                        {aba == '1'? 
                            // Eventos FUTUROS
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
                                {eventosPorPeriodo.eventos.map((card: Evento) =>
                                    (
                                    <Grid container direction="row" alignItems="center" spacing={2} key={card.id}> 
                                        <Grid item  xs={4}>
                                            <EventCard isLoadingSubButton={isLoadingSubButton} idIncricoes={idIncricoes} setIdIncricoes={setIdIncricoes} inscrito={idIncricoes.includes(card.id)} key={card.id} eventoId={card.id} id={card.id} subscribeButton={hasSubscribeButton} image={card.imagemUrl} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial} />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <RecommendationSection recommendationData={[card, card, card, card]} inHomePage={true} mainEvent={card} userId = {''}/>
                                        </Grid>
                                    </Grid>
                                    )
                                    )
                                }
                            </Box>
                            :
                            //Eventos Anteriores
                            <Grid container direction="row" alignItems="center" spacing={2}>
                                {eventosPorPeriodo.eventos.map((card: Evento) =>
                                    (
                                        <Grid item xs={4} key={card.id}>
                                            <EventCard isLoadingSubButton={isLoadingSubButton} idIncricoes={idIncricoes} setIdIncricoes={setIdIncricoes} inscrito={idIncricoes.includes(card.id)} key={card.id} eventoId={card.id} id={card.id} subscribeButton={hasSubscribeButton} image={card.imagemUrl} title={card.titulo} location={card.localizacao} initialDate={card.dataInicial} />
                                        </Grid>
                                    )
                                    )
                                }
                            </Grid>
                        }
                    </div>
                }
            </div>
        )
    )

    const mobile = useMediaQuery('(max-width: 720px)');
    return (
        <Box mt={5} style={{marginTop: '3rem'}}>
            {home &&
                <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3 }}>
                    <Paper
                        component="form"
                        sx={{ display: 'flex', alignItems: 'center', padding: '1rem', }}
                    >
                        {isLoading ? <CircularProgress /> :
                            <IconButton onClick={handleClick} type="button" aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        }
                        <InputBase
                            onKeyDown={handleKeyDown}
                            value={inputValue}
                            onChange={(e) => { setInputValue(e.target.value) }}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Filtre pelo nome do evento"
                            inputProps={{ 'aria-label': 'busca de eventos' }}
                        />
                    </Paper>
                </Box>
            }
            {home &&
                <Button onClick={limpaBusca} variant="text">Limpar Busca</Button>
            }
            {/* flexDirection: 'column',alignItems:'flex-start' */}
            <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <Box mb={2} sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: mobile ? 'column' : 'row', alignItems: mobile ? 'flex-start' : 'center', gap: '0.5rem' }}>
                    <Typography sx={{ marginRight: 'auto' }} variant="h3">{home ? 'Eventos' : 'Meus eventos'}</Typography>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel id="demo-simple-select-label">Período</InputLabel>
                        <Select
                            inputProps={{ MenuProps: { disableScrollLock: true } }}
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
                    {home &&
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                inputProps={{ MenuProps: { disableScrollLock: true } }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Categoria"
                                // onChange={(event: SelectChangeEvent) => (setCategory(event.target.value))}
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value='Todas'>Todas</MenuItem>
                                {categorias && categorias.map((categoria) =>
                                    <MenuItem key={categoria.id} value={categoria.nome}>{categoria.nome}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    }
                    <Box sx={{ marginLeft: '0.5rem' }}>
                        <ViewModuleIcon onClick={() => { setListView(false); setCookie('listView', 'false'); }} sx={{ color: 'black', opacity: listView ? 0.5 : 1, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'gray' : 'black', borderRadius: '4px' }} fontSize="large" />

                        <ViewListIcon onClick={() => { setListView(true), setCookie('listView', 'true'); }} sx={{ color: 'black', opacity: listView ? 1 : 0.5, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'black' : 'gray', borderRadius: '4px' }} fontSize="large" />
                    </Box>
                </Box>
                {isLoadingMeusEventos ?
                (<Grid container alignItems='center' justifyContent='center' sx={{height:'20vh'}}>
                    <CircularProgress size={100} /> 
                </Grid>):
                   (<Box>
                        <TabContext value={aba}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={(e, newValue) => { setAba(newValue) }}>
                                    <Tab label='Próximos' value='1'></Tab>
                                    <Tab label='Anteriores' value='0'></Tab>
                                </TabList>

                            </Box>

                            <TabPanel sx={{ padding: 0 }} value='0'>
                                {events(eventToMapOld, false)}
                            </TabPanel>

                            <TabPanel sx={{ padding: 0 }} value='1'>
                                {events(eventToMapNew, true)}
                            </TabPanel>
                        </TabContext>
                    </Box>)
                }
            </Box>
        </Box>

    )
}
