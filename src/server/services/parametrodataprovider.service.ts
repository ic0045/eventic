import { Session } from "next-auth";
import { FindManyOptions, FindOptionsOrder, Repository } from "typeorm";
import { ParametroRepo, UsuarioRepo } from "../database";
import { Parametro } from "../entities/parametro.entity"
import ServerAbstractDataProvider from "./abstractdataprovider.service"
import { GetListParams } from "react-admin";

export default class ParametroDataProvider extends ServerAbstractDataProvider<Parametro>
{
    private sessao: Session | null;

    public constructor(session: Session | null) {
      super(ParametroRepo as unknown as Repository<Parametro>);
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
          : ({ [field]: direction } as FindOptionsOrder<Parametro>); //field?.replace('\.id','_id');
        const range = [(page - 1) * perPage, page * perPage - 1];
    
        let options: FindManyOptions<Parametro> = {
          where: filter,
          skip: range[0],
          take: perPage,
          order,
        };
        if (usuario?.permissao !== `admin`) {
          options = {
            ...options,
            relations: {},
            where: {
              ...options.where,
            },
          };
        }
        return await this.repository.findAndCount(options);
      }
 }