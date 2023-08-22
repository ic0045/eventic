import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity("avaliacao", { schema: "public" })
export class Avaliacao{

    @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "avaliacao_pkey"})
    id: string;
    
    @Column("smallint", {name: "nota"})
    nota: number;

    @Column("character varying", {name: "comentario", length: 500})
    comentario: string;

    @ManyToOne(() => Usuario, (usuario) => usuario.avaliacoes)
    @JoinColumn([{ 
      name: "usuario_id",
      referencedColumnName: "id",
      foreignKeyConstraintName: "usuario_fk"
    }])
    usuario: Relation<Usuario>[];

    @Column("timestamp", { name: "created_at" , nullable: false, default: () => 'CURRENT_TIMESTAMP'  })
    createdAt: Date;

    @Column("timestamp", { name: "updated_at", nullable: true , onUpdate: 'CURRENT_TIMESTAMP',  })
    updatedAt: Date | null;

    @BeforeInsert()
    @BeforeUpdate()
    validateNota() {
        if(this.nota < 1 || this.nota > 5)
            throw new Error('Avaliacao Regra: Nota deve ser entre 1 e 5');
    }

}