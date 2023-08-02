import pinataSDK from "@pinata/sdk";
import { IIPFSservice } from "./IIPFSservice";

export class IPFSservice implements IIPFSservice {
  private readonly pinata = new pinataSDK({
    pinataJWTKey: process.env.PINATA_JWT_TOKEN as string,
  });

  /**
   * Uploads/Stores metadata to Pinata in JSON format
   * @param file 
   */
  async uploadToIPFS(file: string): Promise<string> {
    const result = await this.pinata.pinJSONToIPFS(file);
    return process.env.PINATA_IPFS_BASE_URL + result.IpfsHash;
  }
}
