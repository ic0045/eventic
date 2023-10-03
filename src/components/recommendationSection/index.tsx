import React from 'react';
import { Box, Grid, Typography, Card} from "@mui/material";
import RecommendedEventCard from './recommendedEventCard/index';

import Image from 'next/image'
import Link from 'next/link';

export default function RecommendationSection({recommendationData, inHomePage, mainEvent, userId} : 
    {recommendationData : Evento[], inHomePage : boolean, mainEvent : Evento, userId : string}){

    if(inHomePage){ //Seção de recomendação na home page

        while(recommendationData.length > 4)//limita a 4 eventos
            recommendationData.pop()

        return(
            <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3, maxHeight: "220px" }}>
                <Typography variant="h6" gutterBottom>
                    Eventos Similares a {mainEvent.titulo}
                </Typography>
                <Grid container spacing={3}>
                    {
                        recommendationData.map((rec) =>(
                        <Grid item xs={3} key={rec.id} title={rec?.titulo} >
                            <Link href={{ pathname: '/eventos/detalhes',query: {id: rec.id}}}>
                                <Card sx={{ display: 'flex', boxShadow: 3, 
                                    flexDirection:'column', flexGrow: 1 }}>
                                    <Box sx={{alignSelf: 'center'}}>
                                            <Image
                                            height={180}
                                            width={200}
                                            src={rec?.imagemUrl || ''}
                                            alt='evento-imagem'
                                            unoptimized
                                            onError={(event)=>event.currentTarget.src = "/images/default.png"}
                                            />
                                    </Box>
                                </Card>
                            </Link>
                        </Grid>
                        ))
                    }
                </Grid>
            </Box>
        )
    }

    //se na seção de detalhes do evento
    while(recommendationData.length > 5)//limita a 5 eventos
            recommendationData.pop()

    return(
        <Grid item md={12}>
            <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Recomendações de eventos similares
                </Typography>

                {/* <Grid container spacing={3} */}
                <Grid container justifyContent={"space-evenly"}>
                { recommendationData.map((rec) => <RecommendedEventCard key={rec.id} eventData={rec} userId={userId}  />)}
                </Grid>
            </Box>
        </Grid>
    )
}