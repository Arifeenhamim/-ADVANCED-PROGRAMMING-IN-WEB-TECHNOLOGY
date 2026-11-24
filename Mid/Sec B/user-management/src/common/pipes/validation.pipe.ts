import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { validate, ValidatorOptions } from "class-validator";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(
    private options: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
    },
  ) {}
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object, this.options);
    if (errors.length > 0) {
      throw new BadRequestException("Bad Request Payload");
    }
    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
