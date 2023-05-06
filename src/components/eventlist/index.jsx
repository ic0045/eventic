// import styles from './eventcard.module.css'
import { Box, Typography, IconButton, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";

export default function ListCard(props) {

    const [subscribed, setSubscribed] = useState(false)

    return (
        <Box m={2} sx={{ display: 'flex', borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3,padding:'1rem' }}>
            <Box mr={10} sx={{ alignSelf: 'center' }}>
                <Typography variant="h5" align="center" >
                    {props.day}
                </Typography>
                <Typography variant="body1" gutterBottom align="center" >
                    {props.month}
                </Typography>
            </Box>

            <Box>
                <Typography component="div" variant="h5">
                    {props.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    <LocationOnIcon fontSize='4px' /> {props.location}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    <AccessTimeIcon fontSize='4px' /> {props.time}
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
                <IconButton  onClick={() => setSubscribed(!subscribed)} aria-label="notification">
                    <NotificationsActiveIcon fontSize='small' sx={subscribed ? { color: '#FFCB00' } : undefined} />
                </IconButton>
                <IconButton sx={{marginTop:'auto'}} aria-label="share">
                    <ShareIcon fontSize='small' />
                </IconButton>
            </Box>
        </Box >
    );
}