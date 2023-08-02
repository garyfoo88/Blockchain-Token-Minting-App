import { INft } from "../../models/Nft";
import { IUser } from "../../models/User";
import { INFTRepository } from "../../repositories/nft/INFTRepository";
import { HttpExceptionError } from "../../utils/errors";
import { IIPFSservice } from "../files/IIPFSservice";
import { IWeb3Service } from "../web3/IWeb3Service";
import { INFTService } from "./INFTService";
import axios from "axios";

export class NFTService implements INFTService {
  constructor(
    private readonly web3Service: IWeb3Service,
    private readonly nftRepository: INFTRepository,
    private readonly ipfsService: IIPFSservice
  ) {}

  /**
   * Function that creates an NFT entry in database and mint nft
   * @param user
   * @param metaData
   */
  async mintNFT(
    user: IUser,
    metaData: {
      name: string;
      description: string;
      imageUrl: string;
    }
  ): Promise<INft> {
    const tokenURI = await this.ipfsService.uploadToIPFS(
      JSON.stringify(metaData)
    );
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

  /**
   * Get metadata for an NFT
   * Fetches data from Pinata
   * @param nftId
   * @param userId
   */
  async getNFTDetails(nftId: string, userId: string): Promise<any> {
    const nft = await this.nftRepository.getOneNFT({
      _id: nftId,
      owner: userId,
    });

    if (!nft) throw new HttpExceptionError(404, "NFT not found");

    const { data } = await axios.get(nft.tokenURI);
    return data;
  }

  /**
   * Get all NFTs for a user
   * @param userId
   */
  async getNFTsByOwner(userId: string): Promise<INft[]> {
    return this.nftRepository.getNFTs({ owner: userId });
  }
}
