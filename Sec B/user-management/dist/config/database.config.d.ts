import { DefaultNamingStrategy, NamingStrategyInterface, DataSourceOptions } from "typeorm";
export declare class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    tableName(className: string, customName: string): string;
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string;
    relationName(propertyName: string): string;
    joinColumnName(relationName: string, referencedColumnName: string): string;
    joinTableName(firstTableName: string, secondTableName: string, firstPropertyName: string): string;
    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string;
    classTableInheritanceParentColumnName(parentTableName: string, parentTableIdPropertyName: string): string;
}
export declare const dataSourceOptions: DataSourceOptions;
export default dataSourceOptions;
