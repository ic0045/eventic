import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Usuario } from "@app/entities/Usuario"
import { Evento } from "@app/entities/Evento"
import { Inscricao } from "@app/entities/Inscricao"
import { PreferenciasUsuario } from "@app/entities/PreferenciasUsuario"
import { Categoria } from "@app/entities/Categoria"

dotenv.config();

export const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, //disable before production
    logging: false,
    entities: [
        Usuario, 
        Evento,
        Categoria, 
        Inscricao, 
        PreferenciasUsuario,
    ],
    migrations: [],
    subscribers: [],
    ssl: { 
        rejectUnauthorized: false
    }
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
export const CategoriaRepo = datasource.getRepository(Categoria);