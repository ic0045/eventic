import {
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  GetListParams,
  UpdateParams,
  UpdateManyParams,
  Identifier,
  CreateParams,
  DeleteParams,
  DeleteManyParams,
} from "react-admin";
import ServerAbstractDataProvider from "./abstractdataprovider.service";
import { Session, getServerSession } from "next-auth";
import {
  CategoriaRepo,
  EventoRepo,
  InscricaoRepo,
  UsuarioRepo,
} from "@app/server/database";
import { FindManyOptions, FindOptionsOrder, Repository } from "typeorm";
import { Evento } from "../entities/evento.entity";

export default class EventoDataProvider extends ServerAbstractDataProvider<Evento> {
  private sessao: Session | null;

  public constructor(session: Session | null) {
    super(EventoRepo as unknown as Repository<Evento>);
    this.sessao = session;
  }
  public async getOne({ id }: GetOneParams<any>) {
    const usuario = await UsuarioRepo.findOne({
      where: { email: this.sessao?.user.email },
    });
    let options: FindManyOptions<Evento> = { where: { id } };
    if (usuario?.permissao !== `admin`) {
      options = {
        ...options,
        relations: {
          criador: true,
        },
        where: {
          ...options.where,
          criador: { email: this.sessao?.user.email },
        },
      };
    }

    return await this.repository.findOne(options);
  } 

  public async getList({ filter, pagination, sort }: GetListParams) {
    const { page, perPage } = pagination;
    const usuario = await UsuarioRepo.findOne({
      where: { email: this.sessao?.user.email },
    });
    const { field, order: direction } = sort as { field: string; order: any };

    // Resolvendo os casos de FKs.. categoria.id vira categoria_id
    const order = field?.includes(".id")
      ? {}
      : ({ [field]: direction } as FindOptionsOrder<Evento>); //field?.replace('\.id','_id');
    const range = [(page - 1) * perPage, page * perPage - 1];

    let options: FindManyOptions<Evento> = {
      where: filter,
      skip: range[0],
      take: perPage,
      order,
    };
    if (usuario?.permissao !== `admin`) {
      options = {
        ...options,
        relations: {
          criador: true,
        },
        where: {
          ...options.where,
          criador: { email: this.sessao?.user.email },
        },
      };
    }
    return await this.repository.findAndCount(options);
  }

  public async update({
    id,
    data,
    previousData,
  }: UpdateParams<any>) {

    const evento = await this.repository.findOne({ where: {
      id: id
    }});

    if(evento?.criador.id !== this.sessao?.user.id && this.sessao?.user.permissao !== 'admin'){
      return new Evento();
    }
    
    return await super.update({id, data, previousData});
  }

  public updateMany({
    ids,
    data,
  }: UpdateManyParams<any>): Promise<Identifier[]> {
    throw new Error("Method not implemented.");
  }

  public async create({ data, meta }: CreateParams<any>): Promise<any> {
    if(this.sessao?.user.permissao === 'visitante'){
      return new Evento();
    }

    return super.create({data, meta});
  }
  public async delete({
    id,
    previousData,
  }: DeleteParams<any>): Promise<Evento | null> {
    const evento = await this.repository.findOne({ where: {
      id: id
    }});

    if(evento?.criador.id !== this.sessao?.user.id && this.sessao?.user.permissao !== 'admin'){
      return new Evento();
    }

    return super.delete({ id, previousData });
  }
  public deleteMany({ ids }: DeleteManyParams<any>): Promise<any[]> {
    throw new Error("Method not implemented.");
  }
}
