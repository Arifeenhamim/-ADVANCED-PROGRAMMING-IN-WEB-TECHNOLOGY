import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "@/src/app.module";
import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { join } from "path";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), "uploads"), {
    prefix: "/uploads/",
  });

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set("trust proxy", true);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          // Swagger UI needs 'unsafe-inline' to function correctly
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "validator.swagger.io"], // Allow Swagger images
          connectSrc: ["'self'"],
        },
      },
      // This policy can block Swagger assets, so we disable it for now
      crossOriginEmbedderPolicy: false,
    }),
  );

  // 1. Logger
  app.use((req: Request, res: Response, next: NextFunction) => {
    const now = new Date().toISOString().replace("T", " ").replace(/\..+/, "");
    console.log(`[HTTP] [${now}] ${req.method} ${req.originalUrl}`);
    next();
  });

  // 2. Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle("KDex API")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  // 3. Cookie Parser
  const cookieSecret =
    process.env.COOKIE_SECRET || "fallback-secret-dont-use-in-prod";
  app.use(cookieParser(cookieSecret));

  // 4. CORS Configuration
  const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    : [];

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    maxAge: 86400,
  });

  await app.listen(parseInt(process.env.PORT as string));
}
bootstrap();
