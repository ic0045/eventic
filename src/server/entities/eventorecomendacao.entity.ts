import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Avaliacao } from "./avaliacao.entity";
import { Evento } from "./evento.entity";
import { Recomendacao } from "./recomendacao.entity";

@Entity("evento_recomendado", { schema: "public" })
export class EventoRecomendado{

    @PrimaryColumn({name: "recomendacao_id", type: "uuid", unique:false, nullable:false})
    @ManyToOne(() => Recomendacao)
    @JoinColumn({
      name:"recomendacao_id", 
      referencedColumnName: "id",
      foreignKeyConstraintName: "recomendacao_fk"
    })
    recomendacao: Recomendacao;

    @PrimaryColumn({name: "evento_id", type: "uuid", unique:false, nullable:false})
    @ManyToOne(() => Evento)
    @JoinColumn({
      name:"evento_id", 
      referencedColumnName: "id",
      foreignKeyConstraintName: "evento_fk"
    })
    evento: Evento;

    @PrimaryColumn({name: "avaliacao_id", type: "uuid", unique:false, nullable:false})
    @ManyToOne(() => Avaliacao)
    @JoinColumn({
      name:"avaliacao_id", 
      referencedColumnName: "id",
      foreignKeyConstraintName: "avaliacao_fk"
    })
    avaliacao: Avaliacao;
}