import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Evento } from "./evento.entity";

@Entity("recomendacao", { schema: "public" })
export class Recomendacao{
    @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "recomendacao_pkey"})
    id: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({
      name:"usuario_id", 
      referencedColumnName: "id",
      foreignKeyConstraintName: "usuario_fk"
    })
    usuario: Usuario;

    eventosRecomendados: Evento[];

    precisao: number;
}