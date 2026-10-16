export default () => ({
  extra: {
    timezone: "Asia/Dhaka",
    is_live: process.env.IS_LIVE || "no",
  },
  env: {
    JWT_BEARER_SECRET: process.env.JWT_BEARER_SECRET || null,
    EMAIL_URL: process.env.EMAIL_URL || "",
    EMAILS: process.env.EMAILS,
    REDIS_URL: process.env.REDIS_URL,
  },
  environment: {
    is_production: process.env.IS_PRODUCTION == "yes" ? true : false,
    is_log_active: process.env.IS_LOG_ACTIVE == "yes" ? true : false,
  },
});
