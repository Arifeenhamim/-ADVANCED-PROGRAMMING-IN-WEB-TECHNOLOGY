import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import {
  makeFindOneOption,
  makeFindOption,
} from "@/common/helpers/requestParser";

@Injectable()
export class QueryParserPipe implements PipeTransform {
  constructor(
    private readonly findType: "ONE" | "MANY",
    private readonly searchFields: string[] = [],
  ) {}
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    // Make sure to only run your logic on queries
    if (type === "query") return this.transformQuery(value);
    return value;
  }

  transformQuery(query: any) {
    if (typeof query !== "object" || !query) return query;

    try {
      if (this.findType == "MANY") {
        query = makeFindOption(query, this.searchFields);
      } else {
        query = makeFindOneOption(query);
      }
    } catch (err) {
      throw new BadRequestException("Bad Query String");
    }

    return query;
  }
}
