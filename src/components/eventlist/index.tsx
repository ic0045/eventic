// import styles from './eventcard.module.css'
import { Box, Typography, IconButton, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";
import SubscribeButton from "@app/components/subscribebutton/SubscribeButton"
import Link from 'next/link';
import styles from './eventdetails.module.css'

interface Props {
    title: string
    day: string
    month: string
    location: string
    time: string
}

export default function ListCard(props: Props) {

    const [subscribed, setSubscribed] = useState(false)

    return (
        <Box m={2} sx={{ display: 'flex', borderRadius: '0.3rem', backgroundColor: 'white', boxShadow: 3, padding: '1rem' }}>

            <Box mr={10} sx={{ alignSelf: 'center', marginLeft: '1rem' }}>
                <Typography variant="h5" align="center" >
                    {props.day}
                </Typography>
                <Typography variant="body1" gutterBottom align="center" >
                    {props.month}
                </Typography>
            </Box>

            <Link href='/eventdetails'>
                <Box>
                    <Typography component="div" variant="h5">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        <LocationOnIcon sx={{ fontSize: '90%' }} fontSize='small' /> {props.location}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        <AccessTimeIcon sx={{ fontSize: '90%' }} fontSize='small' /> {props.time}
                    </Typography>
                </Box>
            </Link>

            <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: 'auto' }}>
                <SubscribeButton />
                <IconButton sx={{ marginTop: 'auto' }} aria-label="share">
                    <ShareIcon fontSize='small' />
                </IconButton>
            </Box>
        </Box >
    );
}