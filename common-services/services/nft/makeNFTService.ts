import { NFTRepository } from "../../repositories/nft/NFTRepository";
import { IPFSservice } from "../files/IPFSservice";
import { Web3Service } from "../web3/Web3Service";
import { NFTService } from "./NFTService";

export const makeNFTService = () => {
  const web3Service = new Web3Service();
  const nftRepository = new NFTRepository();
  const ipfsService = new IPFSservice();
  return new NFTService(web3Service, nftRepository, ipfsService);
};
