import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Usuario } from "@app/entities/Usuario";
import { Inscricao } from "@app/entities/Inscricao";
import { Categoria } from "@app/entities/Categoria";

/*
* Tipo do corpo de requisição para criação de evento
*/
type CreationReqBody = {
  descricao: string,
  localizacao: string,
  titulo: string,
  imagem_url: string,
  tipo: string | null,
  link_imagem:  string | null,
  link_titulo: string | null,
  link_mais_informacoes: string | null,
  data_inicial: Date,
  data_final: Date | null,
  categoria: Categoria | null,
  criador: Usuario
}

@Entity("evento", { schema: "public" })
export class Evento {

  /**
  * Cria Evento a partir de objeto
  */
  public static createFromObj(obj : CreationReqBody) : Evento{
    const evento = new Evento();
    evento.titulo = obj.titulo;
    evento.descricao = obj.descricao;
    evento.localizacao = obj.localizacao;
    evento.imagemUrl = obj.imagem_url;
    evento.tipo = obj.tipo;
    evento.linkImagem = obj.link_imagem;
    evento.linkMaisInformacoes = obj.link_mais_informacoes;
    evento.dataInicial = obj.data_inicial;
    evento.datafinal = obj.data_final;
    if(obj.categoria)
      evento.categoria = [obj.categoria];
    evento.criador = [obj.criador];
    evento.createdAt = new Date();
    return evento;
  }


  @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "evento_pkey"})
  id: string;

  @Column("character varying", { name: "descricao", length: 1000 })
  descricao: string;

  @Column("character varying", { name: "localizacao", length: 200 })
  localizacao: string;

  @Column("timestamp without time zone", { name: "datainicial" })
  dataInicial: Date;

  @Column("character varying", { name: "titulo", length: 200 })
  titulo: string;

  @Column("boolean", {name: "destaque", default: false})
  destaque: boolean;

  @Column("character varying", { name: "imagem_url" })
  imagemUrl: string;

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

  @Column("character varying", {name: "tipo", nullable: true})
  tipo: string | null; //Categoria informada pelo usuário, caso não se adeque a nenhuma categoria

  @Column("character varying", {
    name: "link_mais_informacoes",
    nullable: true,
  })
  linkMaisInformacoes: string | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.eventos, {nullable: false} )
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
  categoria: Relation<Categoria>[];

  @OneToMany(() => Inscricao, (inscricao) => inscricao.evento)
  inscricoes: Relation<Inscricao>[];
}