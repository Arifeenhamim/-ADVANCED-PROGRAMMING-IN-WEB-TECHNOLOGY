import { PipeTransform, ArgumentMetadata } from "@nestjs/common";
import { ValidatorOptions } from "class-validator";
export declare class ValidationPipe implements PipeTransform<any> {
    private options;
    constructor(options?: ValidatorOptions);
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private toValidate;
}
