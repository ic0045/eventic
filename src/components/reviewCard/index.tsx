import React from 'react';
import { Typography, Rating, Box } from '@mui/material';

interface ReviewProps{
  id: string,
  nota: number,
  comentario: string,
  createdAt: Date,
  updatedAt: Date | null,
  usuario : {primeiroNome : string | null, segundoNome: string | null}
}

function getReviewDate(date : Date){
  return `${date.getDay() < 10? '0'+date.getDay() : date.getDay()}\\${date.getMonth()< 10? '0'+date.getMonth() : date.getMonth()}${new Date().getFullYear() != date.getFullYear()? `\\${(date.getFullYear()).toString().slice(-2)}` : '' }`;
}

export default function ReviewCard({props} : ReviewProps | any) {
  return (
    <Box>
      <Typography variant="subtitle1">{props.usuario.primeiroNome} {props.usuario.segundoNome}</Typography>
      <Rating
        name="read-only"
        value={props.nota}
        readOnly
      />
      <Typography variant="body1">{props.comentario}</Typography>
      <Typography variant="body2">{getReviewDate(new Date(props.updatedAt? props.updatedAt : props.createdAt))}</Typography>
    </Box>
  );
}