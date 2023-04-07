import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Usuario } from "../entities/Usuario"
import { Evento } from "../entities/Evento"
import { Inscricao } from "../entities/Inscricao"
import { PreferenciasUsuario } from "../entities/PreferenciasUsuario"

dotenv.config();

const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Usuario, Evento, Inscricao, PreferenciasUsuario],
    migrations: [],
    subscribers: [],
})

try{
    if(!datasource.isInitialized){
        await datasource.initialize();
        console.log("Data base connected successfully.")
    }
}catch(e){
    throw new Error("Unable to connected to database: " +e)
}

export const UsuarioRepo = datasource.getRepository(Usuario);
export const EventoRepo = datasource.getRepository(Evento);
export const InscricaoRepo = datasource.getRepository(Inscricao);
export const PrefsUsuarioRepo = datasource.getRepository(PreferenciasUsuario);