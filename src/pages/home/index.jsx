import { Box, Container, Grid } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import EventCard from "@app/components/eventcard";
import Typography from "@mui/material/Typography";
import { useState } from "react";

export default function Home() {
    const [value, setValue] = useState('1')

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: '2rem' }}>
            <Box mt={2} sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <Typography variant="h3" mb={3}>Eventos</Typography>
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
    )
}