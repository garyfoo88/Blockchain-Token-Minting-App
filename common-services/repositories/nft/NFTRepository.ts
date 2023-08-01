import Nft, { INft } from "../../models/Nft";
import { INFTRepository } from "./INFTRepository";

export class NFTRepository implements INFTRepository {
  private readonly nft = Nft;
  async createNFT(data: any): Promise<INft> {
    const newNFT = new this.nft(data);

    return newNFT.save();
  }

  async getNFTs(attributes: any): Promise<INft[]> {
    return Nft.find(attributes);
  }

  async getOneNFT(attributes: any): Promise<INft | null> {
    const nft = await Nft.findOne(attributes);
    return nft;
  }
}
