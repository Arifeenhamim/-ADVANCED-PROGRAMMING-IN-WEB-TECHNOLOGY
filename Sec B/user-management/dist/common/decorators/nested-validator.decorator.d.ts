import { ValidationOptions } from "class-validator";
export declare function ValidateNested(schema: new () => any, validationOptions?: ValidationOptions): (object: object, propertyName: string) => void;
