import styles from './home.module.css'
import { Layout } from "@app/components/common/layout/Layout";
import { Box, Container, Grid, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, Button, IconButton } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EventCard from "@app/components/eventcard";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {

    const [period, setPeriod] = useState(1);
    const [category, setCategory] = useState(1);

    const handleChange2 = (event) => {
        setAge(event.target.value);
    };

    const [listView, setListView] = useState(false)

    const [value, setValue] = useState('1')

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <Layout>
            <Container maxWidth="xl" sx={{ marginTop: '2rem' }}>
                <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                    <Typography variant="h3" mb={3}>Eventos</Typography>
                    <Box sx={{ display: 'flex', justifyContent: "flex-end" }} ml={5}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel id="demo-simple-select-label">Período</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={period}
                                label="Período"
                                onChange={(event) =>(setPeriod(event.target.value))}
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
                                onChange={(event) =>(setCategory(event.target.value))}
                            >
                                <MenuItem value={1}>Evento</MenuItem>
                                <MenuItem value={2}>Atividade</MenuItem>
                                <MenuItem value={3}>Palestra</MenuItem>
                            </Select>
                        </FormControl>

                        <ViewModuleIcon onClick={() => setListView(false)} sx={{ color: 'black', opacity: listView ? 0.5 : 1, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'gray' : 'black', borderRadius: '4px' }} fontSize="large" />

                        <ViewListIcon onClick={() => setListView(true)} sx={{ color: 'black', opacity: listView ? 1 : 0.5, alignSelf: 'center', cursor: 'pointer', border: '1px solid', marginRight: '0.5rem', borderColor: listView ? 'black' : 'gray', borderRadius: '4px' }} fontSize="large" />

                    </Box>

                    <TextField
                        sx={{ margin: '2rem auto' }}
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


                    <Box>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange}>
                                    <Tab label='Anteriores' value='0'></Tab>
                                    <Tab label='Proximos' value='1'></Tab>
                                </TabList>

                            </Box>
                            <TabPanel value='0'>
                                <Typography variant="h5" mb={3}>Semana de 2 a 8 de abril</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xl={4} lg={6}>
                                        <EventCard></EventCard>
                                    </Grid>
                                    <Grid item xl={4} lg={6}>
                                        <EventCard></EventCard>
                                    </Grid>
                                    <Grid item xl={4} lg={6}>
                                        <EventCard></EventCard>
                                    </Grid>
                                    <Grid item xl={4} lg={6}>
                                        <EventCard></EventCard>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value='1'>
                                <Typography variant="h5" mb={3}>Semana de 22 a 30 de março</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xl={4} lg={6}>
                                        <EventCard></EventCard>
                                    </Grid>
                                    <Grid item xl={4} lg={6}>
                                        <EventCard></EventCard>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            </Container>
        </Layout>
    )
}