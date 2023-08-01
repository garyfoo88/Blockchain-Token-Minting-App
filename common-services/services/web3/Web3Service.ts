import Web3 from "web3";
import { MintableNFTAbi } from "../../../smart-contracts/MintableNFT/Abi";
import { IWeb3Service } from "./IWeb3Service";

export class Web3Service implements IWeb3Service {
  private readonly web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.INFURA_URL as string)
  );

  async signTransaction(ethAddress: string, tokenURI: string): Promise<any> {
    const nonce = await this.web3.eth.getTransactionCount(
      process.env.ACCOUNT_ADDRESS as string,
      "latest"
    );

    const contract = new this.web3.eth.Contract(
      MintableNFTAbi,
      process.env.ACCOUNT_ADDRESS as string
    ) as any;

    const tx = {
      from: process.env.ACCOUNT_ADDRESS as string,
      to: process.env.CONTRACT_ADDRESS as string,
      nonce: nonce,
      gas: this.web3.utils.toHex(2100000),
      gasPrice: this.web3.utils.toHex(20 * 1e9),
      data: contract.methods.mintNFT(ethAddress, tokenURI).encodeABI(),
    };

    const signedTx = await this.web3.eth.accounts.signTransaction(
      tx,
      process.env.ACCOUNT_PRIVATE_KEY as string
    );
    return this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  }
}
