import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "./Evento";
import { Inscricao } from "./Inscricao";
import { PreferenciasUsuario } from "./PreferenciasUsuario";

@Entity("usuario", { schema: "public" })
export class Usuario {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column("character varying", { name: "primeiro_nome", length: 200 })
  primeiroNome: string;

  @Column("character varying", { name: "segundo_nome", length: 200 })
  segundoNome: string;

  @Column("character varying", { name: "email", length: 100 })
  email: string;

  @Column("character varying", { name: "celular", nullable: true, length: 100 })
  celular: string | null;

  @Column("character varying", { name: "senha", length: 200 })
  senha: string;

  @Column("character varying", { name: "permissao", length: 100 })
  permissao: string;

  @Column("character varying", {
    name: "foto_perfil",
    nullable: true,
    length: 100,
  })
  fotoPerfil: string | null;

  @Column("character varying", { name: "cpf", nullable: true, length: 100 })
  cpf: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("boolean", { name: "email_confirmado", default: false })
  emailConfirmado: boolean;

  @OneToMany(() => Evento, (evento) => evento.criador)
  eventos: Evento[];

  @OneToMany(() => Inscricao, (inscricao) => inscricao.usuario)
  inscricaos: Inscricao[];

  @OneToMany(
    () => PreferenciasUsuario,
    (preferenciasUsuario) => preferenciasUsuario.usuario
  )
  preferenciasUsuarios: PreferenciasUsuario[];
}
