import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";

export const getNFTs = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const nftService = makeNFTService();
    const nfts = await nftService.getNFTsByOwner(userId);
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving NFTs", err });
  }
};
