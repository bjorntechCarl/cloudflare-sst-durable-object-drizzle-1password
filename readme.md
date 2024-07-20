
# Setup Instructions

This project is designed to be used as a Cloudflare Worker that utilizes Durable Objects to manage counters and D1 databases for data storage, as well as 1Password for handling secrets. 

The Durable object and the Worker used to interact with it currently need to be deployed to Cloudflare in a separate step using Wrangler. Until Cloudflare adds more support for this in their Terraform/Pulumi provider this is the only way to do this.

This project also illustrates how you can deploy a D1 database using SST and how to interact with it using Drizzle


To set up this project, follow these steps:

1. **Clone the repository**:
   Clone this repository to your local machine using Git.

2. **Install dependencies**:
   Navigate to the project directory and install the required dependencies:
   ```
   bun install
   ```
   This command will install all the dependencies listed in `package.json`.

3. **Set up environment variables**:
   Create a file named `env.txt` in the project root directory and add your environment variables in the format `KEY=VALUE`. For example:
   ```
   REF_OP_SERVICE_ACCOUNT_TOKEN=your-op-service-account-token
   REF_CLOUDFLARE_API_TOKEN=your-cloudflare-api-token
   REF_CLOUDFLARE_DEFAULT_ACCOUNT_ID=your-cloudflare-default-account-id
   ```
   Replace the placeholders with your actual values. Consider using 1Password to securely manage and retrieve your secrets.

4. **Deploy to Cloudflare - SST**:
   To deploy the project using SST, run the following command:
   ```
   bun run deploy
   ```
   This command will compile your TypeScript code, create a new deployment, and upload the necessary resources to Cloudflare, including the Durable Object and the Worker.

   Make sure to check the SST documentation for more details on deployment options and configurations.

5. **Set up the database with Drizzle**:
   To set up the database, you will need to run the following command:
   ```
   bun run db:generate
   ```
   This command will generate the necessary database schema based on your models. After generating the schema, you can apply any migrations with:
   ```
   bun run db:migrate
   ```
   This will ensure that your database is up to date with the latest changes.
   
   Make sure to check the Drizzle documentation for more details on how to define your models and manage your database schema.

6. **Deploy to Cloudflare - Durable Object**:
   Run the following command to deploy the project to Cloudflare using Wrangler:
   ```
   bun run wrangler:deploy
   ```
   This command will compile the TypeScript code, create a new deployment, and upload the code to Cloudflare. This will only upload the Durable object as well as the Worker needed to interact with the Durable Object.

7. **Verify deployment**:
   Once deployed, verify that the worker is working correctly by sending a GET request to the worker. The response should contain a JSON object with the current value of the counter.

8. **View the database in Drizzle Studio (optional)**:
   If you want to view and manage your database visually, you can use Drizzle Studio. To start Drizzle Studio, run the following command:
   ```
   bun run studio
   ```
   This command will launch the Drizzle Studio interface in your browser, allowing you to explore your database, run queries, and manage your data easily.

Remember to replace the placeholders with your actual values and adjust the instructions according to your specific use case.
