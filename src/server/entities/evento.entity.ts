import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { Usuario } from "@app/server/entities/usuario.entity";
import { Inscricao } from "@app/server/entities/inscricao.entity";
import { Categoria } from "@app/server/entities/categoria.entity";
import moment from "moment";

@Entity("evento", { schema: "public" })
export class Evento {

  /**
  * Cria Evento a partir de objeto
  */
  public static createFromObj(obj: any): Evento {
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
    if (obj.categoria)
      evento.categoria = obj.categoria;
    evento.criador = obj.criador;
    evento.createdAt = new Date();
    return evento;
  }


  @PrimaryGeneratedColumn("uuid", { name: "id", primaryKeyConstraintName: "evento_pkey" })
  id: string;

  @Column("character varying", { name: "descricao", length: 1000 })
  descricao: string;

  @Column("character varying", { name: "localizacao", length: 200 })
  localizacao: string;

  @Column("timestamp without time zone", { name: "datainicial" })
  dataInicial: Date;

  @Column("character varying", { name: "titulo", length: 200 })
  titulo: string;

  @Column("boolean", { name: "destaque", default: false })
  destaque: boolean;

  @Column("character varying", { name: "imagem_url" })
  imagemUrl: string;

  @Column("timestamp", { name: "created_at" , nullable: false, default: () => 'CURRENT_TIMESTAMP'  })
  createdAt: Date;

  @Column("timestamp", { name: "updated_at", nullable: true , onUpdate: 'CURRENT_TIMESTAMP',  })
  updatedAt: Date | null;

  @Column("timestamp without time zone", { name: "datafinal", nullable: true })
  datafinal: Date | null;

  @Column("character varying", { name: "link_imagem", nullable: true })
  linkImagem: string | null;

  @Column("character varying", { name: "link_titulo", nullable: true })
  linkTitulo: string | null;

  @Column("character varying", { name: "tipo", nullable: true })
  tipo: string | null; //Categoria informada pelo usuário, caso não se adeque a nenhuma categoria

  @Column("character varying", {
    name: "link_mais_informacoes",
    nullable: true,
  })
  linkMaisInformacoes: string | null;

  @ManyToOne(() => Usuario, (usuario) => usuario.eventos, { nullable: false })
  @JoinColumn([{
    name: "criador_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "usuario_fk"
  }])
  //@ts-ignore
  criador: Relation<Usuario>;

  @ManyToOne(() => Categoria, (categoria) => categoria.eventos, { eager: true })
  @JoinColumn([{
    name: "categoria_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "categoria_fk",
  }])
  //@ts-ignore
  categoria: Relation<Categoria>;

  @OneToMany(() => Inscricao, (inscricao) => inscricao.evento)
  inscricoes: Relation<Inscricao>[];

  // // readonly fieldTitle
  // protected eventoTituloCompleto: String;

  // @AfterLoad()
  // getCalculatedFields() {
  //   const inicio = moment(this.dataInicial);
  //   if (this.dataInicial && this.datafinal) {
  //     const fim = moment(this.dataInicial);

  //     if (inicio.diff(fim, 'days') == 0) { //mesmo dia
  //       this.eventoTituloCompleto = `${this.titulo} ${inicio.format('DD/MM/YY, hh:mm')} - ${fim.format('hh:mm')}`;
  //     } else {
  //       this.eventoTituloCompleto = `${this.titulo} ${inicio.format('DD/MM/YY, hh:mm')} - ${fim.format('DD/MM/YY, hh:mm')}`;
  //     }
  //   } else {
  //     this.eventoTituloCompleto = `${this.titulo} ${inicio.format('DD/MM/YY, hh:mm')}`;
  //   }
  // }
}