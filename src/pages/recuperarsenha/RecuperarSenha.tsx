import { NextPage } from "next"
import styles from './recuperarsenha.module.css'
import { Grid } from "@mui/material"
import { RecuperarSenhaForm } from "@/components/recuperarsenha/RecuperarSenhaForm"


export const RecuperarSenha: NextPage = () => {

    return (
        <div className={styles.recuperarsenha}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justifyContent="center" >
                <Grid item xs={12} md={6}>
                    <div className={styles.recuperarsenha__form}>
                        <h2>Recuperar senha</h2>
                        <RecuperarSenhaForm />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}