import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

export default function AccountMenu(props: { session: Session }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSair = () => {
    signOut();
  };

  const formatNameInitials = (primeiroNome: string, segundoNome: string) => {
    if (primeiroNome && segundoNome) {
      return `${primeiroNome[0]}${segundoNome[0]}`;
    }
    return "BR";
  };

  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Menu de usuário">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ backgroundColor: "#00B03B", width: 46, height: 46 }}>
              {formatNameInitials(
                props.session.user.primeiroNome, props.session.user.segundoNome
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <Link href="#">
          <MenuItem>Seja Bem Vindo {props.session.user.name}</MenuItem>
        </Link> */}
        <Link style={{ color: "black" }} href="/eventos">
          <MenuItem onClick={handleClose}>Página Inicial</MenuItem>
        </Link>
        <Link style={{ color: "black" }} href="/auth/meucadastro">
          <MenuItem onClick={handleClose}>Meu Cadastro</MenuItem>
        </Link>
        <Link style={{ color: "black" }} href="/eventos/minhasinscricoes">
          <MenuItem onClick={handleClose}>Minhas Inscrições</MenuItem>
        </Link>
        <Divider />
        {props.session.user.permissao.toString() != 'Visitante' &&
          <Link style={{ color: "black" }} href="/admin#">
            <MenuItem onClick={handleClose}>Painel Administrativo</MenuItem>
          </Link>
        }
        <Divider />
        <MenuItem onClick={handleSair}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Sair
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
