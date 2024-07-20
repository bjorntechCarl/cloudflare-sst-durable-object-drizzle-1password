/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "cloudflare-sst-do-drizzle-1p",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "cloudflare",
    };
  },
  async run() {

    const database = new sst.cloudflare.D1("MyDatabase")

    const databaseId = database.id.apply((id) => 
      new sst.Secret("MyDatabaseId", id)
    );

    const cloudflareAccountId = new sst.Secret("CloudflareAccountId", sst.cloudflare.DEFAULT_ACCOUNT_ID)
    const cloudflareApiToken = new sst.Secret("CloudflareApiToken", process.env.CLOUDFLARE_API_TOKEN)

    const hono = new sst.cloudflare.Worker("Hono", {
      url: true,
      handler: "src/sst/index.ts",
      link: [databaseId, cloudflareAccountId, cloudflareApiToken, database],
      transform: {
        worker: {
          serviceBindings: [
          {
            name: 'DURABLE_OBJECTS_COUNTER',
            service: 'durable_objects_counter'
          }
        ]
        }
      }
    });
  
    return {
      api: hono.url,
    };
  },
});
