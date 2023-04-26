import { Box, Container, Grid } from "@mui/material";
import EventCard from "./eventcard/EventCard";
import { Layout } from "@app/components/common/layout/Layout";

export default function Home() {
    return (
        <Layout>
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
        </Layout>
    )
}