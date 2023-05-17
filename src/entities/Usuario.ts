import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation, Unique } from "typeorm";
import { Evento } from "@app/entities/Evento"
import { Inscricao } from "@app/entities/Inscricao";
import { PreferenciasUsuario } from "@app/entities/PreferenciasUsuario";

@Entity("usuario", { schema: "public" })
@Unique('email_unique', ['email'])
export class Usuario {
/**
 * Cria Usuario a partir de objeto
 */
 public static createFromObj(obj : any){
    const usuario = new Usuario();
    const {primeiro_nome, segundo_nome, email, senha, permissao,
      celular, foto_perfil, cpf } = obj;

      usuario.primeiroNome = primeiro_nome;
      usuario.segundoNome = segundo_nome;
      usuario.email = email.toLocaleLowerCase();
      usuario.senha = senha;
      usuario.permissao = permissao;
      if(celular) usuario.celular = celular;
      if(foto_perfil) usuario.fotoPerfil = foto_perfil;
      if(cpf) usuario.cpf = cpf;
      usuario.createdAt = new Date();

      return usuario;
 }

  @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "usuario_pkey"})
  id: string;

  @Column("character varying", { name: "primeiro_nome", length: 200 })
  primeiroNome: string;

  @Column("character varying", { name: "segundo_nome", length: 200 })
  segundoNome: string;

  @Column("character varying", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("boolean", {name: "email_confirmado", default: false})
  emailConfirmado : boolean;

  @Column("character varying", { name: "celular", nullable: true, length: 100 })
  celular: string | null;

  @Column("character varying", { name: "senha", length: 200 })
  senha: string;

  @Column("character varying", { name: "permissao", length: 100 })
  permissao: string;

  @Column("bytea", {
    name: "foto_perfil",
    nullable: true,
    transformer:{
      to: (value : string) => Buffer.from(value),
      from: (value : Buffer) => value.toString()
    }
  })
  fotoPerfil: string | null;

  @Column("character varying", { name: "cpf", nullable: true, length: 100 })
  cpf: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Evento, (evento) => evento.criador)
  eventos: Relation<Evento>[];

  @OneToMany(() => Inscricao, (inscricao) => inscricao.usuario)
  inscricaos: Inscricao[];

  @OneToMany(
    () => PreferenciasUsuario,
    (preferenciasUsuario) => preferenciasUsuario.usuario
  )
  preferenciasUsuarios: PreferenciasUsuario[];
}