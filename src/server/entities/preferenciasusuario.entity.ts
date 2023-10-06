import { Column, Entity, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity("preferencias_usuario", { schema: "public" })
export class PreferenciasUsuario {
  @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "preferencias_usuario_pkey"})
  id: string;

  @Column("varchar", { name: "top_words"})
  topWords: string;

  @OneToOne(() => Usuario)
  @JoinColumn({
    name:"usuario_id", 
    referencedColumnName: "id",
    foreignKeyConstraintName: "usuario_fk"
  })
  usuario: Usuario;
}
