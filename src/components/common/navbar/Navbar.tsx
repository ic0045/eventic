import { Box, Button } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <Box sx={{ display: 'flex', marginTop: '1rem', marginBottom: '3rem' }}>
            <Link href='/home'>
                <Image
                    width={337}
                    height={83}
                    src={"/images/logo.png"}
                    alt='logo'
                />
            </Link>
            <Box sx={{ marginLeft: 'auto', alignSelf: 'center' }}>
                <Link href='/login'>
                    <Button variant="contained" color="success">
                        Login
                    </Button>
                </Link>

                <Link href='/cadastrousario'>
                    <Button variant="contained" sx={{ backgroundColor: "#76D104", marginLeft: "0.5rem" }}>
                        Cadastro
                    </Button>
                </Link>
            </Box>

        </Box>
    )
}