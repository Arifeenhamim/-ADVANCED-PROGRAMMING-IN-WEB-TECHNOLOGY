"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = require("../config/database.config");
const typeorm_1 = require("typeorm");
const migrateRollback = () => {
    console.log(`Rolling back.....`);
    const ds = new typeorm_1.DataSource({
        ...database_config_1.dataSourceOptions,
    });
    ds.initialize()
        .then(() => {
        ds.undoLastMigration()
            .then(() => {
            console.log("rollback completed");
        })
            .catch((err) => console.error(err));
    })
        .catch((err) => console.error(err));
};
migrateRollback();
//# sourceMappingURL=typeorm_migration_rollback.js.map