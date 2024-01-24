import { Entity, JoinColumn, ManyToOne, Column, PrimaryGeneratedColumn, Relation } from "typeorm";
import { Evento } from "./evento.entity";
import { Recomendacao } from "./recomendacao.entity";

@Entity("evento_recomendado", { schema: "public" })
export class EventoRecomendado{

    @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "evento_recomendado_pkey"})
    id: string;

    @ManyToOne(() => Recomendacao, {cascade: ["insert", "remove"]})
    @JoinColumn({
      name:"recomendacao_id", 
      referencedColumnName: "id",
      foreignKeyConstraintName: "recomendacao_fk"
    })
    //@ts-ignore
    recomendacao: Relation<Recomendacao>;

    @ManyToOne(() => Evento, {onDelete: 'CASCADE'})
    @JoinColumn({
      name:"evento_id", 
      referencedColumnName: "id",
      foreignKeyConstraintName: "evento_fk"
    })
    //@ts-ignore
    evento: Relation<Evento>;
}