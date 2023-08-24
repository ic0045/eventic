import React, { useState } from 'react';
import { Typography, TextField, Button, Rating, Box, Container } from '@mui/material';
import { EventoAPI } from '@app/apis/EventoAPI';

interface Props{
  userId: string,
  eventId : string
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    let eventId, userId = props;

    // let request = EventoAPI.avaliar({
    //   rating,
    //   comment,
    //   userId,
    //   eventId
    // });

    // request
    // .catch((err) => console.log("erro avaliar "))
    // .then((res) => console.log("avaliou"))

    // Aqui você pode enviar a avaliação e o comentário para a API ou realizar outras ações necessárias.
    console.log('Avaliação:', rating);
    console.log('Comentário:', comment);

    // Limpar os campos após o envio
    setRating(0);
    setComment('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Avalie este evento
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Box mb={2}>
          <Rating
            name="rating"
            value={rating}
            defaultValue={3}
            onChange={(event, newValue) => handleRatingChange(newValue? newValue : 3)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Comentário"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={comment}
            onChange={handleCommentChange}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Avaliar
        </Button>
      </Box>
    </Container>
  );
}