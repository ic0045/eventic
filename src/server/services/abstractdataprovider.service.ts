import { CreateParams, DeleteManyParams, DeleteParams, GetListParams, GetManyParams, GetManyReferenceParams, GetOneParams, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import { FindOptionsOrder, In, ObjectLiteral, Repository } from "typeorm";

type CustomGetManyReferenceParams = GetManyReferenceParams & { pagination?: any, range: number[] };

export default class ServerAbstractDataProvider<T extends ObjectLiteral> {
    private repository: Repository<T>;
    constructor(repository: Repository<T>) {
        this.repository = repository;
    }
    public async getOne({ id }: GetOneParams<any>) {
        // @ts-ignore
        return await this.repository.findOne({ where: { id } });
    }

    public async getMany({ ids }: GetManyParams) {
        // @ts-ignore
        return await this.repository.find({ where: { id: In(ids as string[]) } })
    }

    public async getManyReference({ filter, id, pagination, sort, target }: CustomGetManyReferenceParams) {
        // return this.repository.find({ where: { id: In(ids as string[]) } })
        return {}
    }

    public async getList({ filter, pagination, sort }: GetListParams) {
        const { page, perPage } = pagination;
        const { field, order: direction } = sort as { field: string, order: any };

        // Resolvendo os casos de FKs.. categoria.id vira categoria_id
        const order = field?.includes('.id') ? {} : { [field]: direction } as FindOptionsOrder<T>; //field?.replace('\.id','_id');
        const range = [(page - 1) * perPage, page * perPage - 1];
        console.log({ sort, pagination, skip: range[0], take: perPage, order })
        return await this.repository.findAndCount({ where: filter, skip: range[0], take: perPage, order })
    }

    public async update({ id, data, previousData }: UpdateParams<any>) {
        const { id: xxx, ...rest } = data;
        // @ts-ignore
        await this.repository.update({ id: id }, rest);
        // @ts-ignore
        const res = await this.repository.findOne({ where: { id: id } });
        return res;
    }
    public async updateMany({ ids, data }: UpdateManyParams<any>) {
        const { id: xxx, ...rest } = data;
        // @ts-ignore
        await this.repository.update({ id: In(ids as string[]) }, rest);
        return ids;
    }
    public async create({ data, meta }: CreateParams<any>) {
        return await this.repository.save(data);
    }
    public async delete({ id, previousData }: DeleteParams<any>) {
        const categoria = await this.repository.findOne({ where: { id: id } });
        await this.repository.delete(id);
        return categoria;
    }
    public async deleteMany({ ids }: DeleteManyParams<any>) {
        await this.repository.delete(ids);
        return ids;
    }
}