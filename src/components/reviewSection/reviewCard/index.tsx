import React from 'react';
import { Typography, Rating, Box, Grid, Avatar } from '@mui/material';

interface ReviewProps{
  id: string,
  nota: number,
  comentario: string,
  createdAt: Date,
  updatedAt: Date | null,
  usuario : {primeiroNome : string | null, segundoNome: string | null, fotoPerfil: string | null}
}

function getReviewDate(date : Date){
  return `${date.getDate() < 10? '0'+date.getDate() : date.getDate()}\\${date.getMonth()< 10? '0'+(date.getMonth()+1) : date.getMonth()+1}${new Date().getFullYear() != date.getFullYear()? `\\${(date.getFullYear()).toString().slice(-2)}` : '' }`;
}

export default function ReviewCard({props} : ReviewProps | any) {
  return (
    <Box sx={
      {borderRadius: '0.3rem',backgroundColor: '#f2f6fc',padding: '1rem', boxShadow: 3, 
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '15px' 
      }}>

      <Avatar src={props.usuario.fotoPerfil}>
        {props.usuario.fotoPerfil? "" : `${props.usuario.primeiroNome[0]}${props.usuario.segundoNome[0]}`}
      </Avatar>

      <Box sx={{display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Rating  name="read-only" value={props.nota} readOnly/>
        
        <Box sx={{}}>
        <Box sx= {{display:"flex", alignItems:"center", gap: '15px'}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{props.usuario.primeiroNome} {props.usuario.segundoNome}</Typography>
        </Box>

        <Typography variant="body1">{props.comentario}</Typography>
        <Typography variant="body2">{getReviewDate(new Date(props.updatedAt? props.updatedAt : props.createdAt))}</Typography>
        </Box>

      </Box>


      </Box>
  );
}


/*

<Grid container spacing={1} 
      sx={{borderRadius: '0.3rem',backgroundColor: '#f2f6fc',padding: '1rem', boxShadow: 3}}>
    {/* // <Box sx={{ borderRadius: '0.3rem', backgroundColor: '#f2f6fc', padding: '1rem', boxShadow: 3 }}>
    //   <Grid container spacing={1} sx={{margin: '0px', padding: '0px',   backgroundColor: 'red'}}> }

    <Grid item xs={1} sx={{backgroundColor: 'red',  alignItems:'center'}}>
    <Avatar>
      {props.usuario.fotoPerfil? "" : `${props.usuario.primeiroNome[0]}${props.usuario.segundoNome[0]}`}
    </Avatar>
  </Grid>

  <Grid item xs={11} sx={{backgroundColor: 'blue'}}>
  <Box sx= {{display:"flex", alignItems:"center", gap: '15px'}}>
    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{props.usuario.primeiroNome} {props.usuario.segundoNome}</Typography>
    <Rating name="read-only" value={props.nota} readOnly/>
  </Box>

  <Typography variant="body1">{props.comentario}</Typography>
  <Typography variant="body2">{getReviewDate(new Date(props.updatedAt? props.updatedAt : props.createdAt))}</Typography>
  </Grid>

</Grid>

*/