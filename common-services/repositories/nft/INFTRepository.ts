import { INft } from "../../models/Nft";

export interface INFTRepository {
  createNFT(data: any): Promise<INft>;
  getNFTs(attributes: any): Promise<INft[]>
  getOneNFT(attributes: any): Promise<INft | null>
}
