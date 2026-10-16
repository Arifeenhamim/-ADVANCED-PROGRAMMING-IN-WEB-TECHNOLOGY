import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
export declare class QueryParserPipe implements PipeTransform {
    private readonly findType;
    private readonly searchFields;
    constructor(findType: "ONE" | "MANY", searchFields?: string[]);
    transform(value: any, metadata: ArgumentMetadata): any;
    transformQuery(query: any): any;
}
