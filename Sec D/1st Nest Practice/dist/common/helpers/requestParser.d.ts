import { FindManyOptions, FindOneOptions } from "typeorm";
declare const makeFindOption: (query: any, search_fields: string[]) => FindManyOptions | undefined;
declare const makeFindOneOption: (query: any) => FindOneOptions | undefined;
export { makeFindOption, makeFindOneOption };
