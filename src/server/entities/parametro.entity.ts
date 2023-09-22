import {Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity("parametro", {schema: "public"})
@Unique('nome_unique', ['nome'])
export class Parametro{
    @PrimaryGeneratedColumn("uuid", {name: "id", primaryKeyConstraintName: "parametro_pkey"})
    id: string;

    @Column("character varying", {name: "nome", nullable: false, length: 500})
    nome: string;

    @Column("character varying", {name: "valor"})
    valor: string;
}