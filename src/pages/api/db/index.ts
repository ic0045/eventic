import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Usuario } from "./entities/Usuario"
import { Evento } from "./entities/Evento"
import { Inscricao } from "./entities/Inscricao"
import { PreferenciasUsuario } from "./entities/PreferenciasUsuario"

dotenv.config();

const DB = new DataSource({
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

export function dbInitialize(){
    DB.initialize()
    .then( () => console.log("Data base connected successfully.") )
    .catch( (e) => console.log("Could not connect to database: "+e) )
}

export const UsuarioRepo = DB.getRepository(Usuario);
export const EventoRepo = DB.getRepository(Evento);
export const InscricaoRepo = DB.getRepository(Inscricao);
export const PrefsUsuarioRepo = DB.getRepository(PreferenciasUsuario);