import { seeder } from "nestjs-seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import dataSourceOptions from "./config/database.config";

seeder({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [__dirname + "/database/factories/*.factory.{ts,js}"],
    }),
    TypeOrmModule.forFeature([]),
  ],
}).run([]);
