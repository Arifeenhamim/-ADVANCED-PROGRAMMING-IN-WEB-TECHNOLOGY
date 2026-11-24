import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "@/config/.";

/*
 * Import and provide base typeorm (postgres) related classes.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions)],
})
export class PostgresDatabaseProviderModule {}
