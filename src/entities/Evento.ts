import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Usuario } from "./Usuario";
import { Inscricao } from "./Inscricao";
import { Categoria } from "./Categoria";

@Entity("evento", { schema: "public" })
export class Evento {
  @PrimaryGeneratedColumn("uuid", {name: "id"})
  id: string;

  @Column("character varying", { name: "descricao", length: 1000 })
  descricao: string;

  @Column("character varying", { name: "localizacao", length: 200 })
  localizacao: string;

  @Column("timestamp without time zone", { name: "datainicial" })
  datainicial: Date;

  @Column("character varying", { name: "titulo", length: 200 })
  titulo: string;

  @Column("boolean", {name: "destaque", default: false})
  destaque: boolean;

  @Column("character varying", { name: "imagem_url" })
  imagemUrl: string;

  @Column("character varying", { name: "tipo" })
  tipo: string;

  @Column("timestamp without time zone", { name: "created_at" })
  createdAt: Date;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "datafinal", nullable: true })
  datafinal: Date | null;

  @Column("character varying", { name: "link_imagem", nullable: true })
  linkImagem: string | null;

  @Column("character varying", { name: "link_titulo", nullable: true })
  linkTitulo: string | null;

  @Column("character varying", {
    name: "link_mais_informacoes",
    nullable: true,
  })
  linkMaisInformacoes: string | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.eventos)
  @JoinColumn([{ 
    name: "criador_id", 
    referencedColumnName: "id", 
    foreignKeyConstraintName: "usuario_fk" }])
  criador: Relation<Usuario>[];

  @ManyToOne(() => Categoria, (categoria) => categoria.eventos)
  @JoinColumn([{ 
    name: "categoria_id", 
    referencedColumnName: "id",
    foreignKeyConstraintName: "categoria_fk" }])
  categoria: Categoria;

  @OneToMany(() => Inscricao, (inscricao) => inscricao.evento)
  inscricaos: Relation<Inscricao>[];
}