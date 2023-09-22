import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Usuario } from "@app/server/entities/usuario.entity"
import { Evento, EventoSubscriber } from "@app/server/entities/evento.entity"
import { Inscricao } from "@app/server/entities/inscricao.entity"
import { PreferenciasUsuario } from "@app/server/entities/preferenciasusuario.entity"
import { Categoria } from "@app/server/entities/categoria.entity"
import { Avaliacao } from "@app/server/entities/avaliacao.entity"
import { Parametro } from "@app/server/entities/parametro.entity"

dotenv.config();

export const datasource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, //disable before production
    logging: false,
    entities: [
        Usuario, 
        Evento,
        Categoria, 
        Inscricao, 
        PreferenciasUsuario,
        Avaliacao,
        Parametro
    ],
    migrations: [],
    subscribers: [EventoSubscriber],
    // ssl: { 
    //     rejectUnauthorized: false
    // }
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
export const AvaliacaoRepo = datasource.getRepository(Avaliacao);
export const ParametroRepo = datasource.getRepository(Parametro);