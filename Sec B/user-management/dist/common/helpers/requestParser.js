"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeFindOneOption = exports.makeFindOption = void 0;
const typeorm_1 = require("typeorm");
function operationParser(operation, value) {
    if (operation == "ltei") {
        return (0, typeorm_1.LessThanOrEqual)(parseInt(value));
    }
    else if (operation == "lte") {
        return (0, typeorm_1.LessThanOrEqual)(value);
    }
    else if (operation == "in") {
        return (0, typeorm_1.In)(JSON.parse(value));
    }
    return value;
}
const makeFindOption = function (query, search_fields) {
    if (!query)
        return undefined;
    if (query.filters)
        throw { message: "Invalid Query String. filters is a reserved word" };
    const findOption = {};
    let { q, attributes, include, limit, offset, sortBy, ...filters } = query;
    if (attributes) {
        try {
            attributes = JSON.parse(attributes.toString());
        }
        catch (err) { }
        findOption.select = {};
        let selects = [];
        if (!Array.isArray(attributes) && typeof attributes !== "object")
            attributes = attributes.toString().split(",");
        if (!Array.isArray(attributes) && typeof attributes === "object")
            return;
        selects = attributes;
        selects.map((element) => {
            findOption.select = findOption.select ?? {};
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
    if (sortBy) {
        findOption.order = {};
        try {
            sortBy = JSON.parse(sortBy.toString());
        }
        catch (err) { }
        if (sortBy && !Array.isArray(sortBy)) {
            sortBy = [sortBy.toString()];
        }
        const s = sortBy;
        s.map((sort) => {
            const [field, order] = sort.toString().split(":");
            findOption.order = {
                ...findOption.order,
                [field]: order == "desc" ? "desc" : "asc",
            };
        });
    }
    if (offset) {
        try {
            offset = JSON.parse(offset.toString());
        }
        catch (err) { }
        const skip = offset;
        if (Array.isArray(skip)) {
            findOption.skip = parseInt(skip[0]);
        }
        else {
            findOption.skip = parseInt(skip);
        }
    }
    if (limit) {
        try {
            limit = JSON.parse(limit.toString());
        }
        catch (err) { }
        const take = limit;
        if (Array.isArray(take)) {
            findOption.take = parseInt(take[0]);
        }
        else {
            findOption.take = parseInt(take);
        }
    }
    if (q) {
        const whereClauses = [];
        try {
            q = JSON.parse(q.toString());
        }
        catch (err) { }
        const searchTerms = Array.isArray(q) ? q : [q];
        searchTerms.forEach((search) => {
            let [field, value] = search.toString().split(":");
            if (value && search_fields.includes(field)) {
                whereClauses.push({ [field]: (0, typeorm_1.ILike)("%" + value + "%") });
            }
            else if (!value) {
                value = field;
                search_fields.forEach((sField) => {
                    whereClauses.push({ [sField]: (0, typeorm_1.ILike)("%" + value + "%") });
                });
                if (search_fields.includes("first_name") &&
                    search_fields.includes("last_name")) {
                    whereClauses.push({
                        first_name: (0, typeorm_1.Raw)((alias) => `(${alias} || ' ' || ${alias.replace("first_name", "last_name")}) ILIKE :value`, { value: `%${value}%` }),
                    });
                }
            }
        });
        findOption.where = whereClauses;
    }
    if (filters) {
        const parsedFilters = {};
        Object.keys(filters).map((field) => {
            let value = filters[field] ?? "";
            if (Array.isArray(value))
                value = value[0];
            const [opOrVal, val] = value.toString().split(":");
            let comparingValue;
            if (!val) {
                comparingValue = opOrVal;
            }
            else {
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
        }
        else {
            findOption.where = findOption.where.map((where) => {
                return {
                    ...where,
                    ...parsedFilters,
                };
            });
        }
    }
    if (include) {
        try {
            include = JSON.parse(include.toString());
        }
        catch (err) { }
        findOption.relations = {};
        let relations = [];
        if (!Array.isArray(include) && typeof include !== "object")
            include = include?.toString().split(",");
        if (!Array.isArray(include) && typeof include === "object")
            return;
        relations = include;
        relations.forEach((element) => {
            if (!findOption.relations)
                findOption.relations = {};
            const [firstLevel, secondLevel] = element.split(".");
            findOption.relations = {
                ...findOption.relations,
                [firstLevel]: secondLevel
                    ? {
                        ...findOption.relations[firstLevel],
                        [secondLevel]: true,
                    }
                    : (findOption.relations[firstLevel] ?? true),
            };
        });
    }
    return findOption;
};
exports.makeFindOption = makeFindOption;
const makeFindOneOption = function (query) {
    if (!query)
        return undefined;
    const findOption = {};
    let { attributes, include } = query;
    if (attributes) {
        try {
            attributes = JSON.parse(attributes.toString());
        }
        catch (err) { }
        findOption.select = {};
        let selects = [];
        if (!Array.isArray(attributes) && typeof attributes !== "object")
            attributes = attributes.toString().split(",");
        if (!Array.isArray(attributes) && typeof attributes === "object")
            return;
        selects = attributes;
        selects.map((element) => {
            findOption.select = findOption.select ?? {};
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
    if (include) {
        try {
            include = JSON.parse(include.toString());
        }
        catch (err) { }
        findOption.relations = {};
        let relations = [];
        if (!Array.isArray(include) && typeof include !== "object")
            include = include?.toString().split(",");
        if (!Array.isArray(include) && typeof include === "object")
            return;
        relations = include;
        relations.forEach((element) => {
            if (!findOption.relations)
                findOption.relations = {};
            const [firstLevel, secondLevel] = element.split(".");
            findOption.relations = {
                ...findOption.relations,
                [firstLevel]: secondLevel
                    ? {
                        ...findOption.relations[firstLevel],
                        [secondLevel]: true,
                    }
                    : (findOption.relations[firstLevel] ?? true),
            };
        });
    }
    return findOption;
};
exports.makeFindOneOption = makeFindOneOption;
//# sourceMappingURL=requestParser.js.map