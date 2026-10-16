"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateTables = void 0;
const _1 = require("../config");
const typeorm_1 = require("typeorm");
const truncateTables = () => {
    console.log(`Clearing Tables.....`);
    const ds = new typeorm_1.DataSource({
        ..._1.dataSourceOptions,
    });
    return ds
        .initialize()
        .then(async () => {
        try {
            const entities = ds.entityMetadatas;
            for (const entity of entities) {
                const repository = ds.getRepository(entity.name);
                await repository.clear();
            }
            console.log("All tables cleared");
        }
        catch (err) {
            console.error(err);
        }
    })
        .catch((err) => console.error(err));
};
exports.truncateTables = truncateTables;
//# sourceMappingURL=typeorm_truncate_tables.js.map