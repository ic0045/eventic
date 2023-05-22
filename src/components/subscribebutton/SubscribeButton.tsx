import { useState } from "react";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Link from 'next/link';
import { useSession } from "next-auth/react";

export default function SubscribeButton() {

  const [open, setOpen] = useState(false);
  const {data: session} = useSession();

  const [subscribed, setSubscribed] = useState(false)

  const [logged, setLogged] = useState(false)

  const handleClickOpen = () => {
    session ? setSubscribed(!subscribed) : setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="notification">
        <NotificationsActiveIcon sx={subscribed ? { color: '#FFCB00' } : undefined} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Você precisa estar logado para se inscrever!"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
          <Link href='/auth/login'>
            <Button onClick={handleClose} autoFocus>
              Login
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}