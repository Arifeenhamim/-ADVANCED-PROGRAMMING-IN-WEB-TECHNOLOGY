import { dataSourceOptions } from "@/config/database.config";
import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const migrateRollback = () => {
  console.log(`Rolling back.....`);
  const ds = new DataSource({
    ...dataSourceOptions,
  } as PostgresConnectionOptions);
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
