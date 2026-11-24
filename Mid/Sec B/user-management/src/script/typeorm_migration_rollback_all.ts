import { dataSourceOptions } from "@/config/.";
import { DataSource, MigrationExecutor } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const migrateRollbackAll = () => {
  console.log(`Rolling back all migrations`);
  const ds = new DataSource({
    ...dataSourceOptions,
  } as PostgresConnectionOptions);

  ds.initialize()
    .then(async () => {
      const migrationExecutor = new MigrationExecutor(ds);
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
