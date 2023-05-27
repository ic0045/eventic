import { Session } from "next-auth";
import { GetListParams } from "react-admin";
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
 }