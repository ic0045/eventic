import { Box, Button } from "@mui/material";
import Image from 'next/image';
import Link from 'next/link';
import AccountMenu from "@app/components/common/accountmenu/AccountMenu";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {

    const { data: session, status } = useSession()

    if (status === "loading"){
        return <div>Loading</div>
    }

    return (

        <Box sx={{ display: 'flex', marginTop: '1rem', marginBottom: '3rem' }}>
            <Link href='/'>
                <Image
                    width={337}
                    height={83}
                    src={"/images/logo.png"}
                    alt='logo'
                />
            </Link>



            <Box sx={{ marginLeft: 'auto', alignSelf: 'center' }}>

                {status === "authenticated" ?
                    <AccountMenu session={session} /> :
                    <>
                        <Link href='/auth/login'>
                            <Button variant="contained" color="success">
                                Login
                            </Button>
                        </Link>

                        <Link href='/auth/cadastro'>
                            <Button variant="contained" sx={{ backgroundColor: "#76D104", marginLeft: "0.5rem" }}>
                                Cadastro
                            </Button>
                        </Link>
                    </>

                }

            </Box>

        </Box>
    )
}