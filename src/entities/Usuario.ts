import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation, ValueTransformer, Unique } from "typeorm";
import { Evento } from "@app/entities/Evento"
import { Inscricao } from "@app/entities/Inscricao";
import { PreferenciasUsuario } from "@app/entities/PreferenciasUsuario";
import { Conta } from "@app/entities/Conta";
import { Sessao } from "@app/entities/Sessao";

const transformer: Record<"date" | "bigint", ValueTransformer> = {
  date: {
      from: (date: string | null) => date && new Date(parseInt(date, 10)),
      to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
      from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
      to: (bigInt?: number) => bigInt?.toString(),
  },
}

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

      usuario.name = primeiro_nome;
      usuario.segundoNome = segundo_nome;
      usuario.email = email;
      usuario.senha = senha;
      usuario.permissao = permissao;
      if(celular) usuario.celular = celular;
      if(foto_perfil) usuario.image = foto_perfil;
      if(cpf) usuario.cpf = cpf;
      usuario.createdAt = new Date();

      return usuario;
 }

  //nextAuth entity field
  @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "usuario_pkey"})
  id: string;

  //nextAuth entity field
  @Column("character varying", { name: "primeiro_nome", length: 200 })
  name: string;

  @Column("character varying", { name: "segundo_nome", length: 200 })
  segundoNome: string;

  //nextAuth entity field
  @Column("character varying", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("character varying", { name: "celular", nullable: true, length: 100 })
  celular: string | null;

  @Column("character varying", { name: "senha", length: 200 })
  senha: string;

  @Column("character varying", { name: "permissao", length: 100 })
  permissao: string;

  //nextAuth entity field
  @Column("character varying", {
    name: "foto_perfil",
    nullable: true,
    length: 100,
  })
  image: string | null;

  @Column("character varying", { name: "cpf", nullable: true, length: 100 })
  cpf: string | null;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  //nextAuth entity field
  @Column({ type: "varchar", nullable: true, transformer: transformer.date })
  emailVerified!: string | null

  @OneToMany(() => Evento, (evento) => evento.criador)
  eventos: Relation<Evento>[];

  @OneToMany(() => Inscricao, (inscricao) => inscricao.usuario)
  inscricaos: Inscricao[];

  @OneToMany(
    () => PreferenciasUsuario,
    (preferenciasUsuario) => preferenciasUsuario.usuario
  )
  preferenciasUsuarios: PreferenciasUsuario[];

  //nextAuth entity field
  @OneToMany(() => Sessao, (session) => session.userId)
  sessions!: Sessao[]

  //nextAuth entity field
  @OneToMany(() => Conta, (account) => account.userId)
  accounts!: Conta[]
}