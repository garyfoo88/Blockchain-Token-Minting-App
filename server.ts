import { APIGatewayEvent, Context } from "aws-lambda";
import express, { Response } from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";
import { config } from "dotenv";
import nftRoutes from "./routes/nft";
import authRoutes from "./routes/auth";
import serverless from "serverless-http";
import { loadSecrets } from "./common-services/utils/secrets";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

config();
const app = express();

mongoose
  .connect(
    process.env.MONGODB_URI as string,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  )
  .then(() => {
    console.log("Database Connected Successfully.");
  })
  .catch(() => {
    console.log("Error Connecting to the Database");
  });

const swaggerDefinition = {
  info: {
    title: "MintableLite API",
    version: "1.0.0",
    description: "APIs for MintableLite NFT platform",
  },
  host: "localhost:3000",
  basePath: "/",
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Route for health check
app.get("/", (res: Response) => {
  res.json({ message: "MintableLite API" });
});

app.use("/nft", nftRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server is running on port 3000"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const serverlessHandler = serverless(app);

export const handler = async (event: APIGatewayEvent, context: Context) => {
  // Load secrets from AWS Secrets Manager
  await loadSecrets(process.env.STAGE as string);
  const output = await serverlessHandler(event, context);
  return output;
};
