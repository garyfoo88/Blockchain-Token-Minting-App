import { INft } from "../../models/Nft";
import { IUser } from "../../models/User";

export interface INFTService {
  mintNFT(user: IUser, metaData: any): Promise<INft>;
  getNFTsByOwner(userId: string): Promise<INft[]>;
}
