import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";

export const getNFTDetails = async (req: CustomRequest, res: Response) => {
  const nftId = req.params.id;
  const userId = req.user._id;
  try {
    if (!nftId) {
      res.status(400).json({
        message: "Invalid Id",
      });
      return;
    }

    const nftService = makeNFTService();
    const metadata = await nftService.getNFTDetails(nftId, userId);

    return res.status(200).json({
      data: {
        metadata,
      },
      message: "Retrieved NFT successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error retrieving NFT Details", err });
  }
};
