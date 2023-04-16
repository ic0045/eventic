import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ValueTransformer,
    Relation
} from "typeorm"
import { Usuario } from "./Usuario"

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

@Entity({ name: "sessao" }) //Entidade para nextAuth
export class Sessao {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ unique: true })
  sessionToken!: string

  @Column({ type: "uuid" })
  userId!: string

  @Column({ transformer: transformer.date })
  expires!: string

  @ManyToOne(() => Usuario, (user) => user.sessions)
  user!: Relation<Usuario>[]
}