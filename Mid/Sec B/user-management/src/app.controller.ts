import { AppService } from "@/src/app.service";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  healthCheck() {
    // The middleware in main.ts will automatically 
    // attach the CSRF cookies to this response.
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
