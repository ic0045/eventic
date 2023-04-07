import { NextPage } from "next"
import { LoginForm } from "@/components/login/LoginForm"
import styles from './login.module.css'
import { Grid } from "@mui/material"

export const Login: NextPage = () => {

    return (
        <div className={styles.login}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item md={6}>
                    <div className={styles.imagem}></div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className={styles.login__form}>
                        <h2>Login</h2>
                        <LoginForm />
                    </div>
                </Grid>
            </Grid>
        </div>

    )
} 