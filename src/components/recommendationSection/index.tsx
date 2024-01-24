import React, { useState } from 'react';
import { Box, Grid, Typography, Card} from "@mui/material";
import RecommendedEventCard from './recommendedEventCard/index';

import Image from 'next/image'
import Link from 'next/link';
import { RecomendacaoAPI } from '@app/apis/RecomendacaoAPI';
import { Evento } from "../../../app";

export default function RecommendationSection({recommendationData, inHomePage, mainEvent, userId, tipoRecomendacao} : 
    {recommendationData : Evento[], inHomePage : boolean, mainEvent : Evento, userId : string, tipoRecomendacao : number}){

    //Indica se já foi persistida uma recomendação para a instância de recomendação atual
    const [recAlredyStored, setRecAlredyStored] = useState(false);

    const storeRec = async () => {
        if(!recAlredyStored){
            let res = await RecomendacaoAPI.cadastrar({usuario_id: userId});
            for(let ev of recommendationData){
                await RecomendacaoAPI.insereEventoRecomendacao({recomendacao_id: res.id, evento_id: ev.id});
            }
                        
            setRecAlredyStored(true);
        }
    }

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

                {recommendationData.length != 0?
                    <Grid container justifyContent={"space-evenly"}>
                        {recommendationData.map((rec) => <RecommendedEventCard key={rec.id} eventData={rec} userId={userId} storeRec={storeRec} /> )}
                    </Grid>
                :
                <Typography variant='body1'>
                    Nenhum evento similar.
                </Typography>
                }

            </Box>
        </Grid>
    )
}