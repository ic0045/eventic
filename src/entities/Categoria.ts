import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Evento } from "./Evento";

@Entity("categoria", { schema: "public" })
export class Categoria{
    @PrimaryGeneratedColumn("uuid", {name: "id"})
    id: string;     

    @Column("character varying", { name: "nome", length: 100 })
    nome: string;

    @Column("character varying", { name: "icone", nullable: true, length: 100 })
    icone: string;

    @OneToMany(() => Evento, (evento) => evento.categoria)
    eventos: Evento[];
}