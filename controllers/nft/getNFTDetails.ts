import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";
import { HttpExceptionError } from "../../common-services/utils/errors";

export const getNFTDetails = async (req: CustomRequest, res: Response) => {
  const nftId = req.params.id;
  const userId = req.user._id;
  try {
    if (!nftId) {
      throw new HttpExceptionError(400, "Missing required fields");
    }

    const nftService = makeNFTService();
    const metadata = await nftService.getNFTDetails(nftId, userId);

    return res.status(200).json({
      data: metadata,
    });
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error registering user", error });
    }
  }
};
