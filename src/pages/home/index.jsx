import { Container, Grid } from "@mui/material";
import EventCard from "@app/components/eventcard";

export default function Home() {
    return (
        <Container maxWidth="xl" sx={{marginTop:'2rem'}}>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <EventCard></EventCard>
                </Grid>
                <Grid item md={4}>
                    <EventCard></EventCard>
                </Grid>
                <Grid item md={4}>
                    <EventCard></EventCard>
                </Grid>
                <Grid item md={4}>
                    <EventCard></EventCard>
                </Grid>
            </Grid>
        </Container>
    )
}