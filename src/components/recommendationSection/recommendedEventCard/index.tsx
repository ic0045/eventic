import React, { useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Rating} from "@mui/material";
import { EventoAPI } from '@app/apis/EventoAPI';
import Image from 'next/image'
import Link from 'next/link';

export default function RecommendedEventCard({eventData, userId} : {eventData: Evento, userId : string}){

    const [rating, setRating] = useState(0);
    
    const handleRatingChange = (newValue: number) => {
        setRating(newValue);
        let request = EventoAPI.avaliar({
            nota: newValue,
            comentario: '',
            usuario_id: userId,
            evento_id: eventData.id
          });
          request
          .catch((err) => {})
          .then((res) => {});
    };

    return(
        <Grid item xs={3} key={eventData.id}>
                <Card sx={{ display: 'flex', maxWidth: '420px', boxShadow: 3, 
                    flexDirection:'column', flexGrow: 1, alignItems:'center', justifyContent: 'center'}}>
                    
                    <Link href={{ pathname: '/eventos/detalhes',query: {id: eventData.id}}}>
                        <Box sx={{alignSelf: 'center'}}>
                            <Image
                            height={230}
                            width={230}
                            src={eventData?.imagemUrl || ''}
                            alt='evento-imagem'
                            unoptimized
                            onError={(event)=>event.currentTarget.src = "/images/default.png"}
                            />
                        </Box>
                    </Link> 

                <Link href={{ pathname: '/eventos/detalhes',query: {id: eventData.id}}} style={{color: 'inherit'}}>
                    <CardContent sx={{alignSelf: 'center', }}> 
                        <Typography gutterBottom variant="body2" fontWeight={'bold'} align={'center'}  component="div"
                            style={{overflow: "hidden", textOverflow: "ellipsis",
                                    display: "-webkit-box", WebkitLineClamp: 1, lineClamp: 1, WebkitBoxOrient: "vertical"
                                }}>
                            {eventData.titulo}
                        </Typography>
                    </CardContent>
                </Link> 

                {userId && userId != ''?
                    <Rating sx={{alignSelf:'center'}} 
                        name="rating" value={rating} defaultValue={0}
                        onChange={(event, newValue) => handleRatingChange(newValue? newValue : 0)}
                    />
                        :
                    <></>
                }
            </Card>
        </Grid>
    ) 
}