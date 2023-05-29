import { Session } from "next-auth";
import { CreateParams, DeleteManyParams, DeleteParams, GetListParams, GetOneParams, UpdateParams } from "react-admin";
import { Repository, FindOptionsOrder, FindManyOptions } from "typeorm";
import { UsuarioRepo } from "../database";
import { Usuario } from "../entities/usuario.entity";
import ServerAbstractDataProvider from "./abstractdataprovider.service";


export default class UsuarioDataProvider extends ServerAbstractDataProvider<Usuario>
{
    private sessao: Session | null;

    public constructor(session: Session | null) {
      super(UsuarioRepo as unknown as Repository<Usuario>);
      this.sessao = session;
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
          : ({ [field]: direction } as FindOptionsOrder<Usuario>); //field?.replace('\.id','_id');
        const range = [(page - 1) * perPage, page * perPage - 1];
    
        let options: FindManyOptions<Usuario> = {
          where: filter,
          skip: range[0],
          take: perPage,
          order,
        };
        if (usuario?.permissao !== `admin`) {
          options = {
            where: {
              ...options.where,
              email: usuario?.email
            },
          };
        }
        return await this.repository.findAndCount(options);
      }

    public async getOne({ id }: GetOneParams<any>) {
        // @ts-ignore
        let getId = id;
        if(this.sessao?.user.permissao !== 'admin'){
          getId = id === this.sessao?.user.id ? id : "";
        }
        return await super.getOne(getId);
    }

    public async create({ data, meta }: CreateParams<any>) {
      
      if(this.sessao?.user.permissao !== 'admin') {
        return {};
      }
      return await super.create(data);
    }

    public async delete({ id, previousData }: DeleteParams<any>) {

      if(this.sessao?.user.permissao !== 'admin') {
        return new Usuario();
      }
      
      return await super.delete({id, previousData});
    }

    public async update({ id, data, previousData }: UpdateParams<any>): Promise<Usuario | null> {
      if(id !== this.sessao?.user.id && this.sessao?.user.permissao !== 'admin'){
        return new Usuario();
      }
      
      return await super.update({id, data, previousData});

    }

    public async deleteMany({ ids }: DeleteManyParams<any>): Promise<any[]> {
      const deletedIds: string[] = []
      ids.forEach((id) => {
        this.delete({id, previousData: ""}).then((usuario) => {
          deletedIds.push(usuario?.id as string);
        })
      })

      return deletedIds;
    }



 }