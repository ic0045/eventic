import { NotificarEm } from "@app/common/constants";
import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn,
  Relation } from "typeorm";
import { Evento } from "./evento.entity";
import { Usuario } from "./usuario.entity";

@Entity("inscricao", { schema: "public" })
export class Inscricao {
  @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "inscricao_pkey"})
  id: string;

  @Column("character varying", { name: "notificar_em", nullable: true, length:100 })
  notificarEm: NotificarEm | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  //Id do batch para envio programado
  @Column("character varying", {name: "batch_id"})
  batchId: string;

  //Status do batch
  @Column("character varying", {name: "batch_status", default: "active"})
  batchStatus: string;

  @ManyToOne(() => Evento, (evento) => evento.inscricoes, {eager:true})
  @JoinColumn([{ 
    name: "evento_id", 
    referencedColumnName: "id",
    foreignKeyConstraintName: "evento_fk"
  }])
  //@ts-ignore
  evento: Relation<Evento>;

  @ManyToOne(() => Usuario, (usuario) => usuario.inscricaos, {eager:true})
  @JoinColumn([{ 
    name: "usuario_id", 
    referencedColumnName: "id",
    foreignKeyConstraintName: "usuario_fk"
   }])
   //@ts-ignore
  usuario: Relation<Usuario>;
}