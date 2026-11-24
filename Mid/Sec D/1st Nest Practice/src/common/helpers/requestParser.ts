import { Request } from "express";
import {
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  ILike,
  In,
  LessThanOrEqual,
  Raw,
} from "typeorm";

interface CustomFindManyOptions extends FindManyOptions {
  /**
   * Specifies what columns should be retrieved.
   */
  select?: any;
  /**
   * Indicates what relations of entity should be loaded (simplified left join form).
   */
  relations?: {
    [index: string]: any;
  };
}

interface CustomFindOneOptions extends FindOneOptions {
  /**
   * Specifies what columns should be retrieved.
   */
  select?: any;
  /**
   * Indicates what relations of entity should be loaded (simplified left join form).
   */
  relations?: {
    [index: string]: any;
  };
}

/**
 * Parse processable operation for TypeOrm from string
 * @date 2022-06-28
 * @param {any} operation:string
 * @param {any} value:string
 * @returns {FindOperator<any> | string | number}
 */
function operationParser(
  operation: string,
  value: string,
): FindOperator<any> | string | number {
  //TODO:Implement strategies to parse operation
  if (operation == "ltei") {
    return LessThanOrEqual(parseInt(value));
  } else if (operation == "lte") {
    return LessThanOrEqual(value);
  } else if (operation == "in") {
    return In(JSON.parse(value));
  }
  return value;
}

/**
 * Takes query as parameters and returns undefined|FindManyOptions based on the query string
 * @param {QueryString} query
 * @param {string[]} search_fields - Array of fields to search
 * @returns {FindManyOptions | undefined}
 */
const makeFindOption = function (
  query: any,
  search_fields: string[],
): FindManyOptions | undefined {
  if (!query) return undefined;
  //since we will be using filters as a dynamic array so treat as a reserved word
  if (query.filters)
    throw { message: "Invalid Query String. filters is a reserved word" };
  const findOption: CustomFindManyOptions = {};
  let { q, attributes, include, limit, offset, sortBy, ...filters } = query;

  //if columns to select are specified then return them only
  if (attributes) {
    try {
      attributes = JSON.parse(attributes.toString()) as string;
    } catch (err) {}
    findOption.select = {};
    let selects: any = [];
    if (!Array.isArray(attributes) && typeof attributes !== "object")
      attributes = attributes.toString().split(",");
    if (!Array.isArray(attributes) && typeof attributes === "object") return;
    selects = attributes;
    selects.map((element: string) => {
      findOption.select = findOption.select ?? {};
      //TODO:logic to perform any raw query if specified on the query string with the column name

      const [levelOne, levelTwo, levelThree] = element.toString().split(".");
      findOption.select[levelOne] = findOption.select[levelOne] ?? true;
      if (levelTwo) {
        findOption.select[levelOne] =
          findOption.select[levelOne] != true
            ? findOption.select[levelOne]
            : {};
        findOption.select[levelOne][levelTwo] = true;
        if (levelThree) {
          findOption.select[levelOne][levelTwo] =
            findOption.select[levelOne][levelTwo] != true
              ? findOption.select[levelOne][levelTwo]
              : {};
          findOption.select[levelOne][levelTwo][levelThree] = true;
        }
      }
    });
  }
  //sort the result set by a column
  if (sortBy) {
    findOption.order = {};
    try {
      sortBy = JSON.parse(sortBy.toString()) as string;
    } catch (err) {}
    if (sortBy && !Array.isArray(sortBy)) {
      sortBy = [sortBy.toString()];
    }
    const s = sortBy as string[];
    s.map((sort) => {
      const [field, order] = sort.toString().split(":");
      findOption.order = {
        ...findOption.order,
        [field]: order == "desc" ? "desc" : "asc",
      } as any;
    });
  }
  //number of rows to skip from beginning
  if (offset) {
    try {
      offset = JSON.parse(offset.toString()) as string;
    } catch (err) {}
    const skip = offset;
    if (Array.isArray(skip)) {
      findOption.skip = parseInt(skip[0] as string);
    } else {
      findOption.skip = parseInt(skip as string);
    }
  }
  //number of rows to return
  if (limit) {
    try {
      limit = JSON.parse(limit.toString()) as string;
    } catch (err) {}
    const take = limit;
    if (Array.isArray(take)) {
      findOption.take = parseInt(take[0] as string);
    } else {
      findOption.take = parseInt(take as string);
    }
  }
  //if any search string provided then generate OR query query using the provided search fields
  if (q) {
    const whereClauses: any[] = [];
    try {
      q = JSON.parse(q.toString()) as string;
    } catch (err) {}
    const searchTerms = Array.isArray(q) ? q : [q];

    searchTerms.forEach((search) => {
      let [field, value] = search.toString().split(":");
      if (value && search_fields.includes(field)) {
        whereClauses.push({ [field]: ILike("%" + value + "%") });
      } else if (!value) {
        value = field;
        search_fields.forEach((sField) => {
          whereClauses.push({ [sField]: ILike("%" + value + "%") });
        });

        if (
          search_fields.includes("first_name") &&
          search_fields.includes("last_name")
        ) {
          whereClauses.push({
            first_name: Raw(
              (alias) =>
                `(${alias} || ' ' || ${alias.replace(
                  "first_name",
                  "last_name",
                )}) ILIKE :value`,
              { value: `%${value}%` },
            ),
          });
        }
      }
    });
    findOption.where = whereClauses;
  }
  if (filters) {
    const parsedFilters: { [index: string]: any } = {};
    Object.keys(filters).map((field) => {
      let value = filters[field] ?? "";
      if (Array.isArray(value)) value = value[0];
      const [opOrVal, val] = value.toString().split(":");
      let comparingValue;
      if (!val) {
        comparingValue = opOrVal;
      } else {
        comparingValue = operationParser(opOrVal, val);
      }
      const [levelOne, levelTwo, levelThree] = field.toString().split(".");
      parsedFilters[levelOne] = comparingValue;
      if (levelTwo && levelTwo != "column") {
        parsedFilters[levelOne] = {};
        parsedFilters[levelOne][levelTwo] = comparingValue;
        if (levelThree) {
          parsedFilters[levelOne][levelTwo] = {};
          parsedFilters[levelOne][levelTwo][levelThree] = comparingValue;
        }
      }
    });
    if (!findOption.where) {
      findOption.where = { ...parsedFilters };
    } else {
      findOption.where = findOption.where.map((where: any) => {
        return {
          ...where,
          ...parsedFilters,
        };
      });
    }
  }
  //parse relationships
  if (include) {
    try {
      include = JSON.parse(include.toString());
    } catch (err) {}
    findOption.relations = {};
    let relations: any = [];
    if (!Array.isArray(include) && typeof include !== "object")
      include = include?.toString().split(",");
    if (!Array.isArray(include) && typeof include === "object") return;
    relations = include;
    //iterate all relationships and generate (both single and multilevel) relationship entry
    relations.forEach((element: string) => {
      if (!findOption.relations) findOption.relations = {};
      const [firstLevel, secondLevel] = element.split(".");
      findOption.relations = {
        ...findOption.relations,
        [firstLevel]: secondLevel
          ? {
              ...findOption.relations[firstLevel],
              [secondLevel]: true,
            }
          : (findOption.relations[firstLevel] ?? true),
      } as any;
    });
  }
  return findOption;
};

/**
 * Takes query as parameters and returns undefined|FindOneOptions based on the query string
 * @param {QueryString} query
 * @returns {FindOneOptions | undefined}
 */
const makeFindOneOption = function (query: any): FindOneOptions | undefined {
  if (!query) return undefined;
  const findOption: CustomFindOneOptions = {};
  let { attributes, include } = query;

  //if columns to select are specified then return them only
  if (attributes) {
    try {
      attributes = JSON.parse(attributes.toString()) as string;
    } catch (err) {}
    findOption.select = {};
    let selects: any = [];
    if (!Array.isArray(attributes) && typeof attributes !== "object")
      attributes = attributes.toString().split(",");
    if (!Array.isArray(attributes) && typeof attributes === "object") return;
    selects = attributes;
    selects.map((element: string) => {
      findOption.select = findOption.select ?? {};
      //TODO:logic to perform any raw query if specified on the query string with the column name

      const [levelOne, levelTwo, levelThree] = element.toString().split(".");
      findOption.select[levelOne] = findOption.select[levelOne] ?? true;
      if (levelTwo) {
        findOption.select[levelOne] =
          findOption.select[levelOne] != true
            ? findOption.select[levelOne]
            : {};
        findOption.select[levelOne][levelTwo] = true;
        if (levelThree) {
          findOption.select[levelOne][levelTwo] =
            findOption.select[levelOne][levelTwo] != true
              ? findOption.select[levelOne][levelTwo]
              : {};
          findOption.select[levelOne][levelTwo][levelThree] = true;
        }
      }
    });
  }
  //parse relationships
  if (include) {
    try {
      include = JSON.parse(include.toString());
    } catch (err) {}
    findOption.relations = {};
    let relations: any = [];
    if (!Array.isArray(include) && typeof include !== "object")
      include = include?.toString().split(",");
    if (!Array.isArray(include) && typeof include === "object") return;
    relations = include;
    //iterate all relationships and generate (both single and multilevel) relationship entry
    relations.forEach((element: string) => {
      if (!findOption.relations) findOption.relations = {};
      const [firstLevel, secondLevel] = element.split(".");
      findOption.relations = {
        ...findOption.relations,
        [firstLevel]: secondLevel
          ? {
              ...findOption.relations[firstLevel],
              [secondLevel]: true,
            }
          : (findOption.relations[firstLevel] ?? true),
      } as any;
    });
  }
  return findOption;
};

export { makeFindOption, makeFindOneOption };
