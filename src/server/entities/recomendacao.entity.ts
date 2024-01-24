import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn , Column, Relation, OneToMany} from "typeorm";
import { Usuario } from "./usuario.entity";
import { Evento } from "./evento.entity";
import { EventoRecomendado } from "./eventorecomendacao.entity";

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
    //@ts-ignore
    usuario: Relation<Usuario>;

    @Column("int", { name: "tipo_recomendacao", nullable: false})
    tipoRecomendacao : number;

    @Column("double precision", {name: "precisao", nullable: true})
    precisao: number;

    @Column("int", {name: "qt_recomendados", nullable: false})
    quantidadeRecomendados: number;

    @OneToMany(() => EventoRecomendado, (eventoRecomendado) => eventoRecomendado.recomendacao)
    eventosRecomendados: Evento[];


    /* 
    //Alternativa 2
    @OneToMany(() => EventoRecomendado, (eventoRecomendado) => eventoRecomendado.recomendacao)
    eventosRecomendados: EventoRecomendado[];
    */
}