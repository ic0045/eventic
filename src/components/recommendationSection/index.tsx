import React from 'react';
import { Box, Grid, Typography, Card, CardContent} from "@mui/material";
import Image from 'next/image'
import Link from 'next/link';

export default function RecommendationSection({recommendationData, inHomePage} : 
    {recommendationData : Evento[], inHomePage : boolean}){

    if(inHomePage){ //Seção de recomendação na home page

        while(recommendationData.length > 4)//limita a 4 eventos
            recommendationData.pop()

        return(
            <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3, maxHeight: "220px" }}>
                <Typography variant="h6" gutterBottom>
                    Eventos Semelhantes
                </Typography>
                <Grid container spacing={3}>
                    {
                        recommendationData.map((rec) =>(
                        <Grid item xs={3} key={rec.id} >
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

    while(recommendationData.length > 5)//limita a 5 eventos
            recommendationData.pop()

    return(
        <Grid item md={12}>
            <Box sx={{ borderRadius: '0.3rem', backgroundColor: 'white', padding: '1rem', boxShadow: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Eventos Semelhantes
                </Typography>

                <Grid container spacing={2}>
                    {
                        recommendationData.map((rec) =>(
                        <Grid item xs={3} key={rec.id} >
                            <Link href={{ pathname: '/eventos/detalhes',query: {id: rec.id}}}>
                                <Card sx={{ display: 'flex', maxWidth: '420px', boxShadow: 3, 
                                    flexDirection:'column', flexGrow: 1 }}>
                                    
                                    <Box sx={{alignSelf: 'center'}}>
                                            <Image
                                            height={230}
                                            width={230}
                                            src={rec?.imagemUrl || ''}
                                            alt='evento-imagem'
                                            unoptimized
                                            onError={(event)=>event.currentTarget.src = "/images/default.png"}
                                            />
                                    </Box>

                                <CardContent> 
                                    <Typography gutterBottom variant="body2" component="div">
                                        {rec.titulo}
                                    </Typography>
                                </CardContent>

                                </Card>
                            </Link>
                        </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Grid>
    )
}