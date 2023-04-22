import styles from './header.module.css'
import { FunctionComponent } from "react"
import Image from 'next/image'
import { Button, makeStyles } from '@mui/material'


export const Header: FunctionComponent = () => {
    return (
            <div className={styles.header}>
                <div className={styles.header__logo}>
                    <Image src="/logo.png" alt="logo" width="0" height="0" sizes="100vw" style={{ width: '100%', height: 'auto' }} />
                </div>
                <div className={styles.header__session}>
                <div className={styles.header__login}>
                <Button variant="contained" color="success">Login</Button>
                <Button variant="contained" style={{
                    backgroundColor: "#76D104",
                    marginLeft: "0.5rem"
                }}>Cadastro</Button>
                </div>

                </div>

            </div>
    )
} 