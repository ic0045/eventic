import { useState } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { DialogContent, DialogContentText, Tooltip } from "@mui/material";

export default function SubscribeButton() {

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const [subscribed, setSubscribed] = useState(false)

  const [mensagem, setMensagem] = useState("")

  const handleClickOpen = () => {
    if (session) {
      if (subscribed) {
        setMensagem("Inscrição	removida")
        setSubscribed(false)
      }
      else {
        setMensagem("Evento salvo com sucesso")
        setSubscribed(true)
      }
    }
    else {
      setMensagem("Você precisa estar logado para se inscrever!")
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Tooltip title="Inscrever-se">
        <IconButton onClick={handleClickOpen} aria-label="notification">
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
    </div>
  );
}