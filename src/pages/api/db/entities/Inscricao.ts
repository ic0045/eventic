import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn,
  Relation } from "typeorm";
import { Evento } from "./Evento";
import { Usuario } from "./Usuario";

@Entity("inscricao", { schema: "public" })
export class Inscricao {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column("character varying", {
    name: "notificar_em",
    nullable: true,
    length: 100,
  })
  notificarEm: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Evento, (evento) => evento.inscricaos)
  @JoinColumn([{ name: "evento_id", referencedColumnName: "id" }])
  evento: Relation<Evento>[];

  @ManyToOne(() => Usuario, (usuario) => usuario.inscricaos)
  @JoinColumn([{ name: "usuario_id", referencedColumnName: "id" }])
  usuario: Relation<Usuario>[];
}
