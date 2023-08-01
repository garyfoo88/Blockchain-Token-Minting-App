export const credEnv = {
    PINATA_JWT_TOKEN: 'pinataJwtToken',
    MONGODB_URI: 'mongodbUri',
    JWT_SECRET: 'jwtSecret',
    INFURA_URL:'infuraUrl',
    PINATA_IPFS_BASE_URL: 'pinataIpfsBaseUrl',
    CONTRACT_ADDRESS: 'contractAddress',
    ACCOUNT_ADDRESS: 'accountAddress',
    ACCOUNT_PRIVATE_KEY: 'accountPrivateKey'
  } as const;
  
  export type CredEnvType = typeof credEnv;
  export type CredKey = keyof CredEnvType;