// import styles from './eventcard.module.css'
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";

export default function EventCard() {

    const [subscribed, setSubscribed] = useState(false)

    return (
        <Card sx={{ display: 'flex' }}>
            <CardMedia
                component="img"
                sx={{ width: 150, height: 150, objectFit: 'contain' }}
                image="/images/evento1.jpg"
                alt="evento1"
            />
            <Box >
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={() => setSubscribed(!subscribed)} aria-label="notification">
                            <NotificationsActiveIcon sx={subscribed ? { color: '#FFCB00' } : undefined} />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                    </Box>
                    <Typography component="div" variant="h5">
                        Simpósio Nacional
                    </Typography>

                    <Box mt={2} sx={{ display: 'flex', gap: '1rem' }}>
                        <Box>
                            <Typography variant="h5" align="center" >
                                1
                            </Typography>
                            <Typography variant="body1" gutterBottom align="center" >
                                Abril
                            </Typography>
                        </Box>
                        <Box>

                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <LocationOnIcon fontSize='4px' /> Instituto de Matemática
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                <AccessTimeIcon fontSize='4px' /> Sábado, 14h
                            </Typography>
                        </Box>
                    </Box>

                </CardContent>
            </Box>

        </Card>
    );
}