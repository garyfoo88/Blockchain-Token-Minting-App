# MintableLite

MintableLite is an API service where users can mint, list and sell their NFTs.

# Setup

For standard development, to install dependencies for all projects. \*Ensure that you are using Node version of 16 and above.

`npm install` or `npm i`

Thats all!

### Note for Windows users:

For Windows users, you will have a set up a Linux environment before continuing with the setup. [WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install) is recommended if you do not want to use a virtual machine for this. It is also recommended to set up Node.js in WSL following [this guide](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl) and to use the LTS version.

If you are using WSL, you will have to clone this repo in the WSL environment itself, instead of the mounted drive. The `cd` command should bring you to the /home/user directory of your WSL environment. You should also clone it using the Git command line, as a desktop client may introduce permission errors later on. You will likely have to generate a [Personal Access Token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) for this step.

# Common tasks

## Starting a running server

Make sure you are in the root folder where `server.ts` is present

_Start backend development server_

Run `ts-node server.ts`

## Adding a dependency

\_Add a dependency to the project, eg adding `axios`:

`npm i axios` and `npm i @types/axios` (if types are required)

## Accessing the API documentation

_Access swagger server_

Run `ts-node server.ts`
Navigate to `http://localhost:3000/api-docs`

# Local Development

## Overwrite default ENV

Copy the example env file and make the required configuration changes in the .env file

```
cp .env.example .env
```

Start local development server

```sh
ts-node server.ts
```

# Info on services I used for local testing

1. IPFS Storage: Pinata Cloud - Fast, Reliable IPFS Management. Store, manage and distribute your IPFS content with our dev-friendly pinning service. https://www.pinata.cloud
2. Database: MongoDB Atlas - MongoDB Atlas is a fully-managed cloud database that handles all the complexity of deploying, managing, and healing your deployments on the cloud service provider of your choice (AWS , Azure, and GCP). https://www.mongodb.com/atlas/database
3. Blockchain API: Infura - Infura provides the tools and infrastructure that allow developers to easily take their blockchain application. https://www.infura.io/
4. Writing and deploying smart contract: Remix - Remix Online IDE is a powerful toolset for developing, deploying, debugging, and testing Ethereum and EVM-compatible smart contracts. https://remix.ethereum.org/

# Deployment to AWS lamda

Note that this application is currently not deployed to AWS due to absence of an account that i could use for this demo. However, i've added a `serveless.yml` file to demonstrate how the application can be configured for deployment on AWS using the Serverless Framework.
