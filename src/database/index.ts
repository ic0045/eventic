import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Usuario } from "../entities/Usuario"
import { Evento } from "../entities/Evento"
import { Inscricao } from "../entities/Inscricao"
import { PreferenciasUsuario } from "../entities/PreferenciasUsuario"
import { Categoria } from "../entities/Categoria"
import { Sessao } from "@app/entities/Secao"
import { Conta } from "@app/entities/Conta"
import { TokenVerificacao } from "@app/entities/TokenVerificacao"

dotenv.config();

export const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Usuario, 
        Evento, 
        Categoria, 
        Inscricao, 
        PreferenciasUsuario,
        Conta,
        Sessao,
        TokenVerificacao
    ],
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
export const CategoriaRepo = datasource.getRepository(Categoria);