import { INft } from "../../models/Nft";
import { IUser } from "../../models/User";
import { INFTRepository } from "../../repositories/nft/INFTRepository";
import { IIPFSservice } from "../files/IIPFSservice";
import { IWeb3Service } from "../web3/IWeb3Service";
import { INFTService } from "./INFTService";

export class NFTService implements INFTService {
  constructor(
    private readonly web3Service: IWeb3Service,
    private readonly nftRepository: INFTRepository,
    private readonly ipfsService: IIPFSservice
  ) {}

  async mintNFT(user: IUser, metaData: any): Promise<INft> {
    const tokenURI = await this.ipfsService.uploadToIPFS(metaData);
    const transactionReciept = await this.web3Service.signTransaction(
      user.ethAddress,
      tokenURI
    );
    return this.nftRepository.createNFT({
      ...metaData,
      owner: user._id,
      transactionHash: transactionReciept.transactionHash,
      tokenURI: tokenURI,
      tokenId: transactionReciept.logs[0].topics[3],
    });
  }
}
