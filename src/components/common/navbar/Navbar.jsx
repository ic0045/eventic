import { Box, Button} from "@mui/material";
import Image from 'next/image';

export default function Navbar() {
    return (
        <Box sx={{ display: 'flex', marginTop: '1rem', marginBottom: '3rem' }}>
            <Image
                width={337}
                height={83}
                src={"/images/logo.png"}
                alt='logo'
            />
            <Box sx={{ marginLeft: 'auto', alignSelf: 'center' }}>
                <Button variant="contained" color="success">
                    Login
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#76D104", marginLeft: "0.5rem" }}>
                    Cadastro
                </Button>
            </Box>

        </Box>
    )
}