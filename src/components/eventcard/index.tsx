// import styles from './eventcard.module.css'
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";
import SubscribeButton from "@app/components/subscribebutton/SubscribeButton"

interface Props {
    image: string
    title: string
    day: string
    month: string
    location: string
    time: string
}

export default function EventCard(props: Props) {

    const [subscribed, setSubscribed] = useState(false)

    return (
        <Card sx={{ display: 'flex', maxWidth: '420px',boxShadow: 3 }}>
            <CardMedia
                component="img"
                sx={{ width: 150, height: 150, objectFit: 'contain', alignSelf: 'center' }}
                image={props.image}
                alt="evento-image"
            />
            <Box >
                <CardContent>
                    <Typography component="div" variant="h5">
                        {props.title}
                    </Typography>

                    <Box mt={2} sx={{ display: 'flex', gap: '1rem' }}>
                        <Box>
                            <Typography variant="h5" align="center" >
                                {props.day}
                            </Typography>
                            <Typography variant="body1" gutterBottom align="center" >
                                {props.month}
                            </Typography>
                        </Box>
                        <Box>

                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <LocationOnIcon sx={{ fontSize: '90%' }} fontSize='small' /> {props.location}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <AccessTimeIcon sx={{ fontSize: '90%' }} fontSize='small' /> {props.time}
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