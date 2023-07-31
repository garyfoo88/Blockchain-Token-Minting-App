import { Response } from "express";
import Nft from "../../common-services/models/Nft";
import { CustomRequest } from "../../common-services/types/request";
import axios from "axios";

export const getNFTDetails = async (req: CustomRequest, res: Response) => {
  try {
    const nft = await Nft.findOne({ _id: req.params.id, owner: req.user._id });

    if (!nft) {
      return res.status(404).json({
        message: "NFT not found",
      });
    }

    const metadataResponse = await axios.get(nft.tokenURI)

    return res.status(200).json({
      data: {
        metadata: metadataResponse.data,
      },
      message: "Retrieved NFT successfully",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error retrieving NFT Details", err });
  }
};
