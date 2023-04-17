import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from 'dotenv'
import { Usuario } from "@app/entities/Usuario"
import { Evento } from "@app/entities/Evento"
import { Inscricao } from "@app/entities/Inscricao"
import { PreferenciasUsuario } from "@app/entities/PreferenciasUsuario"
import { Categoria } from "@app/entities/Categoria"
import { Sessao } from "@app/entities/Sessao"
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
    synchronize: true, //disable before production
    logging: false,
    entities: [
        Usuario, 
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
        console.log("===================================================")
        console.log("===================================================")
        console.log("Metadatas -->")
        for(let entmtd of datasource.entityMetadatas){
            console.log("\n" + entmtd.inheritanceTree);
            console.log("-->COLUNAS");
            for(let col of entmtd.columns){
                console.log(col.propertyName+" -> "+col.databaseName)
            }
            console.log("-->InverseColumns")
            for(let col of entmtd.inverseColumns){
                console.log(col.propertyName+" -> "+col.databaseName)
            }
            console.log("-->One To Many")
            for(let col of entmtd.oneToManyRelations){
                console.log(col.propertyName+" -> "+ col.type)
            }

        }
        console.log("===================================================")
        console.log("===================================================")
        console.log("===================================================")
    }
}catch(e){
    throw new Error("Unable to connected to database: " +e)
}

export const UsuarioRepo = datasource.getRepository(Usuario);
export const EventoRepo = datasource.getRepository(Evento);
export const InscricaoRepo = datasource.getRepository(Inscricao);
export const PrefsUsuarioRepo = datasource.getRepository(PreferenciasUsuario);
export const CategoriaRepo = datasource.getRepository(Categoria);