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
import { useState } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default function Home() {

    const cards = [
        { id: 0, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 1, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 2, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 3, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 4, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
        { id: 5, image: "/images/evento1.jpg", title: "Simpósio Nacional", day: "1", month: "Abril", location: "Instituto de Matemática", time: "Sábado, 14h" },
    ]

    const [period, setPeriod] = useState('1');
    const [category, setCategory] = useState('1');


    const [listView, setListView] = useState(false)

    const [value, setValue] = useState('1')

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
                            onChange={(event: SelectChangeEvent) => (setPeriod(event.target.value))}
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
                            <Typography variant="h5" mb={3}>Semana de 1 a 7 de maio</Typography>
                            {listView ?
                                <>
                                    {cards.map((card) =>
                                        <EventList key={card.id} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                    )}
                                </> :
                                <>
                                    <Grid container spacing={2}>
                                        {cards.map((card) =>
                                            <Grid key={card.id} item xl={4} lg={6}>
                                                <EventCard image={card.image} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </>}
                            <Typography variant="h5" mb={3} mt={8}>Semana de 24 a 30 de abril</Typography>
                            {listView ?
                                <>
                                    {cards.map((card) =>
                                        <EventList key={card.id} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                    )}
                                </> :
                                <>
                                    <Grid container spacing={2}>
                                        {cards.map((card) =>
                                            <Grid key={card.id} item xl={4} lg={6}>
                                                <EventCard image={card.image} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </>}
                        </TabPanel>
                        <TabPanel value='1'>
                            <Typography variant="h5" mb={3}>Semana de 8 a 14 de maio</Typography>
                            {listView ?
                                <>
                                    {cards.map((card) =>
                                        <EventList key={card.id} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                    )}
                                </> :
                                <>
                                    <Grid container spacing={2}>
                                        {cards.map((card) =>
                                            <Grid key={card.id} item xl={4} lg={6}>
                                                <EventCard image={card.image} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </>}

                                <Typography variant="h5" mb={3} mt={8}>Semana de 15 a 21 de maio</Typography>
                            {listView ?
                                <>
                                    {cards.map((card) =>
                                        <EventList key={card.id} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                    )}
                                </> :
                                <>
                                    <Grid container spacing={2}>
                                        {cards.map((card) =>
                                            <Grid key={card.id} item xl={4} lg={6}>
                                                <EventCard image={card.image} title={card.title} day={card.day} month={card.month} location={card.location} time={card.time} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </>}

                        </TabPanel>
                    </TabContext>
                </Box>
            </Box>
        </Container>

    )
}