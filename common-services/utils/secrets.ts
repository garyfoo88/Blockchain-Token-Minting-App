import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import { credEnv } from "./credEnv";

export async function loadSecrets(
  environment: string,
  secretsManagerClient = new SecretsManagerClient({})
) {
  try {
    const secretValue = await secretsManagerClient.send(
      new GetSecretValueCommand({ SecretId: `mintable/${environment}/keys` })
    );
    if (!secretValue.SecretString) {
      throw new Error(
        `Unable to find mintable/${environment}/keys in secrets manager!`
      );
    }
    const keys = JSON.parse(secretValue.SecretString);
    Object.entries(credEnv).forEach(([env, key]) => {
      if (!process.env[env]) {
        if (!keys[key]) {
          console.log(`Key without value - ${env}: ${key}`);
        }
        process.env[env] = keys[key];
      }
    });
  } catch (error) {
    console.log("Error loading secrets", error);
  }
}
