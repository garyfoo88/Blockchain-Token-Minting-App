import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";

export const getNFTs = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id;
    const nftService = makeNFTService();
    const nfts = await nftService.getNFTsByOwner(userId);
    res.status(200).json(nfts);
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error registering user", error });
    }
  }
};
