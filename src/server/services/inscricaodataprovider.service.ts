import { Session } from "next-auth";
import { FindManyOptions, FindOptionsOrder, Repository } from "typeorm";
import { InscricaoRepo, UsuarioRepo } from "../database";
import { Inscricao } from "../entities/inscricao.entity"
import ServerAbstractDataProvider from "./abstractdataprovider.service"
import { GetListParams } from "react-admin";

export default class InscricaoDataProvider extends ServerAbstractDataProvider<Inscricao>
{
    private sessao: Session | null;

    public constructor(session: Session | null) {
      super(InscricaoRepo as unknown as Repository<Inscricao>);
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
          : ({ [field]: direction } as FindOptionsOrder<Inscricao>); //field?.replace('\.id','_id');
        const range = [(page - 1) * perPage, page * perPage - 1];
    
        let options: FindManyOptions<Inscricao> = {
          where: filter,
          skip: range[0],
          take: perPage,
          order,
        };
        if (usuario?.permissao !== `admin`) {
          options = {
            ...options,
            relations: {
              usuario: true,
            },
            where: {
              ...options.where,
              usuario: { email: this.sessao?.user.email },
            },
          };
        }
        return await this.repository.findAndCount(options);
      }
 }