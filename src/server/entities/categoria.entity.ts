import {
    BeforeInsert,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique
} from "typeorm";
import { Evento } from "./evento.entity";

/*
* Tipo do corpo de requisição para criação de categoria
*/
type CategoriaObj = {
    id: string,
    nome: string,
    icone: string | null,
}

@Entity("categoria", { schema: "public" })
@Unique('nome_unique', ['nome'])
export class Categoria{

    static DEFAULT_CATEGORIA_ICON_PATH = "/path_para_icone_padrao";

    /*
    *   Cria Categoria a partir de objeto com atributos de categoria
    */
    public static createFromCategoriaObject(obj : CategoriaObj) : Categoria{
        const categoria = new Categoria();
        categoria.id = obj.id;
        categoria.nome = obj.nome;
        categoria.icone = obj.icone? obj.icone : this.DEFAULT_CATEGORIA_ICON_PATH; 
        return categoria;
    }

    /*
    * Cria Categoria a partir de objeto de requisção
    */
    public static createFromObject(obj: {nome: string, icone: string | null}) : Categoria{
        const categoria = new Categoria();
        categoria.nome = obj.nome;
        categoria.icone = obj.icone? obj.icone : this.DEFAULT_CATEGORIA_ICON_PATH; 
        return categoria;
    }

    @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "categoria_pkey"})
    id: string;     

    @Column("character varying", { name: "nome", unique: true, length: 100 })
    nome: string;

    @Column("character varying", { name: "icone", nullable: true })
    icone: string;

    @OneToMany(() => Evento, (evento) => evento.categoria)
    eventos: Evento[];

    @BeforeInsert()
    updateDates() {
        this.icone == null ? Categoria.DEFAULT_CATEGORIA_ICON_PATH : this.icone;
    }

}