// import styles from './eventcard.module.css'
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";
import SubscribeButton from "@app/components/subscribebutton/SubscribeButton"
import Link from 'next/link';

interface Props {
    id: string
    initialDate: string
    image: string
    title: string
    location: string
}

export default function EventCard(props: Props) {

    const [subscribed, setSubscribed] = useState(false)

    const meses = [
        "JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
    ];

    const dias = [
        "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado",
    ];

    const data = new Date(props.initialDate)
    const day = data.getDate()
    const month = meses[data.getMonth()]
    const diaSemana = dias[data.getDay()]
    const horario = data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });



    return (

        <Card sx={{ display: 'flex', maxWidth: '420px', boxShadow: 3, flexGrow: 1 }}>
            <Box sx={{ alignSelf: 'center' }}>
                <Link href={{
                    pathname: '/eventos/detalhes',
                    query: {
                        id: props.id
                    }
                }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 150, height: 150, objectFit: 'contain' }}
                        image={props.image}
                        alt="evento-image"
                    />
                </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }} >
                <CardContent>
                    <Typography component="div" variant="h5">
                        {props.title}
                    </Typography>

                    <Box mt={2} sx={{ display: 'flex', gap: '1rem' }}>
                        <Box>
                            <Typography variant="h5" align="center" >
                                {day}
                            </Typography>
                            <Typography variant="body1" gutterBottom align="center" >
                                {month}
                            </Typography>
                        </Box>
                        <Box>

                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <LocationOnIcon sx={{ fontSize: '90%' }} fontSize='small' /> {props.location}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <AccessTimeIcon sx={{ fontSize: '90%' }} fontSize='small' /> {diaSemana}, {horario}h
                            </Typography>
                        </Box>
                    </Box>

                </CardContent>
                <Box mb={1} sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '0.5rem' }}>
                    <SubscribeButton />
                    <IconButton aria-label="share">
                        <ShareIcon fontSize='small' />
                    </IconButton>
                </Box>
            </Box>

        </Card>
    );
}