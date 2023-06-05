import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { DialogContent, DialogContentText, Tooltip } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function SubscribeButton({ eventoId, inscrito, idIncricoes, setIdIncricoes }: { eventoId: string, inscrito: boolean, idIncricoes?: string[], setIdIncricoes?: React.Dispatch<React.SetStateAction<string[]>> }) {

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const [subscribed, setSubscribed] = useState(inscrito)

  const [mensagem, setMensagem] = useState("")

  useEffect(() => {
    setSubscribed(inscrito)
  }, [inscrito]);

  // const handleClickOpen = () => {
  //   if (session) {
  //     if (subscribed) {
  //       setMensagem("Inscrição	removida")
  //       setSubscribed(false)
  //     }
  //     else {
  //       setMensagem("Evento salvo com sucesso")
  //       setSubscribed(true)
  //     }
  //   }
  //   else {
  //     setMensagem("Você precisa estar logado para se inscrever!")
  //   }

  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  // Roda a roda de loading enquanto espera o fetch da api
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = async () => {
    const api = process.env.NEXT_PUBLIC_URL
    const rotaInscrever = `${api}/api/eventos/inscricao`
    const rotaDesiscrever = `${api}/api/eventos/inscricao?desinscrever=true`
    let rota = rotaInscrever

    if (session) {
      if (subscribed) {
        rota = rotaDesiscrever
      }
      setIsLoading(true)
      const response = await fetch(rota, {
        method: 'POST',
        body: JSON.stringify({ evento_id: eventoId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsLoading(false)
      if (response.ok) {
        if (subscribed) {
          if (idIncricoes && setIdIncricoes) {
            let newIdIncricoes = idIncricoes
            newIdIncricoes = idIncricoes.filter(id => id !== eventoId);
            setIdIncricoes(newIdIncricoes)
          }

          setMensagem("Inscrição	removida")
          setSubscribed(false)
        }
        else {
          if (idIncricoes && setIdIncricoes) {
            let newIdIncricoes = idIncricoes
            newIdIncricoes.push(eventoId)
            setIdIncricoes(newIdIncricoes)
          }
          setMensagem("Evento salvo com sucesso")
          setSubscribed(true)
        }
      } else {
        setMensagem("Erro no servidor")
      }
    }
    else {
      setMensagem("Você precisa estar logado para se inscrever!")
    }

    setOpen(true);
  };



  return (
    <div>
      {isLoading ? <CircularProgress size={32} /> :
        <>
          <Tooltip title={subscribed? "Desinscrever-se": "Inscrever-se"}>
            <IconButton onClick={handleButtonClick} aria-label="notification">
              <NotificationsActiveIcon sx={subscribed ? { color: '#FFCB00' } : undefined} />
            </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle sx={{ maxWidth: '300px' }} id="alert-dialog-title">
              {mensagem}
            </DialogTitle>

            {session && subscribed ?
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Você será notificado por email 3 dias antes do evento
                </DialogContentText>
              </DialogContent>
              : <></>}

            <DialogActions>
              <Button onClick={handleClose}>Fechar</Button>
              {session ? <></> :
                <Link href='/auth/login'>
                  <Button onClick={handleClose} autoFocus>
                    Login
                  </Button>
                </Link>
              }
            </DialogActions>
          </Dialog>
        </>
      }
    </div>
  );
}