"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../config");
const typeorm_1 = require("typeorm");
const migrateRollbackAll = () => {
    console.log(`Rolling back all migrations`);
    const ds = new typeorm_1.DataSource({
        ..._1.dataSourceOptions,
    });
    ds.initialize()
        .then(async () => {
        const migrationExecutor = new typeorm_1.MigrationExecutor(ds);
        const migrations = await migrationExecutor.getAllMigrations();
        for (let i = 0; i < migrations.length; i++) {
            migrationExecutor.undoLastMigration();
        }
    })
        .then(() => {
        console.log("All migration rolled back");
    });
};
migrateRollbackAll();
//# sourceMappingURL=typeorm_migration_rollback_all.js.map