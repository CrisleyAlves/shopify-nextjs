declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
  interface Window {
    gtag?: Gtag.Gtag;
  }
}

export default global;
