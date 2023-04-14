import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "./Evento";
import { Inscricao } from "./Inscricao";
import { PreferenciasUsuario } from "./PreferenciasUsuario";

@Entity("usuario", { schema: "public" })
export class Usuario {

/**
 * Cria Usuario a partir de objeto
 */
 public static createFromObj(obj : any){
    const usuario = new Usuario();
    const {primeiro_nome, segundo_nome, email, senha, permissao,
      celular, foto_perfil, cpf, email_confirmado } = obj;

      usuario.primeiroNome = primeiro_nome;
      usuario.segundoNome = segundo_nome;
      usuario.email = email;
      usuario.senha = senha;
      usuario.permissao = permissao;
      if(celular) usuario.celular = celular;
      if(foto_perfil) usuario.fotoPerfil = foto_perfil;
      if(cpf) usuario.cpf = cpf;
      if(email_confirmado) usuario.emailConfirmado = email_confirmado;
      usuario.createdAt = new Date();

      return usuario;
 }

  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column("character varying", { name: "primeiro_nome", length: 200 })
  primeiroNome: string;

  @Column("character varying", { name: "segundo_nome", length: 200 })
  segundoNome: string;

  @Column("character varying", { name: "email", length: 100, unique: true })
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