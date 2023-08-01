import Nft, { INft } from "../../models/Nft";
import { INFTRepository } from "./INFTRepository";

export class NFTRepository implements INFTRepository {
  private readonly nft = Nft;
  async createNFT(data: any): Promise<INft> {
    const newNFT = new this.nft(data);

    return newNFT.save();
  }
}
