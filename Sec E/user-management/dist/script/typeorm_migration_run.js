"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../config");
const typeorm_1 = require("typeorm");
const migrateRun = () => {
    console.log(`Migrating.....`);
    const ds = new typeorm_1.DataSource({
        ..._1.dataSourceOptions,
    });
    ds.initialize()
        .then(() => {
        ds.runMigrations()
            .then(() => {
            console.log("migration completed");
        })
            .catch((err) => console.error(err));
    })
        .catch((err) => console.error(err));
};
migrateRun();
//# sourceMappingURL=typeorm_migration_run.js.map