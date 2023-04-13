import { Column, Entity, JoinColumn, ManyToOne, Relation, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";

@Entity("preferencias_usuario", { schema: "public" })
export class PreferenciasUsuario {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column("boolean", { name: "notificar_novos_eventos", default: () => "true" })
  notificarNovosEventos: boolean;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.preferenciasUsuarios)
  @JoinColumn([{ 
    name: "usuario_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "usuario_fk"
  }])
  usuario: Relation<Usuario>[];
}
