import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { EventoAPI } from '@app/apis/EventoAPI';
import {  TextField, Button, Rating, Box, Grid } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


interface Props{
  userId: string,
  eventId : string
  comentario: string,
  nota: number,
  isEdicao : boolean,
  setReviewed :  Dispatch<SetStateAction<boolean>>
}

export default function ReviewForm(props : Props) {
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState<string>('');

  const handleRatingChange = (newValue: number) => {
    setRating(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleButtonClick = (isUpdate : boolean) => {
    if(isUpdate){
        let request = EventoAPI.avaliar({
        nota: rating,
        comentario: comment,
        usuario_id: props.userId,
        evento_id: props.eventId
      });
      request
      .catch((err) => console.log("Erro ao att"))
      .then((res) => props.setReviewed(true));
    }else{
      let request = EventoAPI.deleteAvaliacao(props.eventId);
      request
      .catch((err) => console.log("Erro ao deletar"))
      .then((res) => props.setReviewed(true));
    }
    window.location.reload();
  };

  useEffect(() => {
    setRating(props.nota);
    setComment(props.comentario);
  },[props.nota,props.comentario]);

  return (

        <Box component="form">

          <Box mb={2}>
            <Rating
              name="rating"
              value={rating}
              defaultValue={3}
              onChange={(event, newValue) => handleRatingChange(newValue? newValue : 3)}
            />
          </Box>

            <Box  mb={2}>
              <TextField
                label="Comentário"
                multiline
                rows={4}
                fullWidth
                inputProps={{maxLength: 500}}
                variant="outlined"
                value={comment}
                onChange={handleCommentChange}
              />
            </Box>

          {
            props.isEdicao?
            <Grid container direction="row" spacing={3}>
              <Grid item>
                <Button variant="contained" color="primary"
                  onClick={()=>handleButtonClick(true)}>
                  Avaliar
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" color="error" startIcon={<ClearIcon color='error'/>}
                  onClick={()=>handleButtonClick(false)}>
                    Remover Avaliação
                </Button>
              </Grid>
            </Grid>
            :
            <Button variant="contained" color="primary"
              onClick={()=>handleButtonClick(true)}>
              Avaliar
            </Button>
          }

        </Box>     
  );
}