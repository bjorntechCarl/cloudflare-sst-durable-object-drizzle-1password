/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    CloudflareAccountId: {
      type: "sst.sst.Secret"
      value: string
    }
    CloudflareApiToken: {
      type: "sst.sst.Secret"
      value: string
    }
    Hono: {
      type: "sst.cloudflare.Worker"
      url: string
    }
    MyDatabaseId: {
      type: "sst.sst.Secret"
      value: string
    }
  }
}
// cloudflare 
declare module "sst" {
  export interface Resource {
    MyDatabase: import("@cloudflare/workers-types").D1Database
  }
}
