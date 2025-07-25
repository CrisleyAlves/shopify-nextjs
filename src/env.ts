import { z } from "zod";

// It helps us to avoid Typescript errors when using environment variables
const envSchema = z.object({
  COMPANY_NAME: z.string(),
  TWITTER_CREATOR: z.string(),
  TWITTER_SITE: z.string(),
  SITE_NAME: z.string(),
  SHOPIFY_REVALIDATION_SECRET: z.string(),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
  SHOPIFY_STORE_DOMAIN: z.string(),
  ANALYTICS_TRACKING_ID: z.string(),
});

envSchema.parse(process.env);
