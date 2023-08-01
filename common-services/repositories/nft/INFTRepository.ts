import { INft } from "../../models/Nft";

export interface INFTRepository {
  createNFT(data: any): Promise<INft>;
}
