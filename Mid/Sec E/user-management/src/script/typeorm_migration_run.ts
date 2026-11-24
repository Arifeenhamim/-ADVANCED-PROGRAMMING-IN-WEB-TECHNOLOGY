import { dataSourceOptions } from "@/config/.";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const migrateRun = () => {
  console.log(`Migrating.....`);
  const ds = new DataSource({
    ...dataSourceOptions,
  } as PostgresConnectionOptions);
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
