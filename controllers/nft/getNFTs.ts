import { Response } from "express";
import Nft from "../../common-services/models/Nft";
import { CustomRequest } from "../../common-services/types/request";

export const getNFTs = async (req: CustomRequest, res: Response) => {
  try {
    const userId = req.user._id; // retrieve the authenticated user's ID from the request
    const nfts = await Nft.find({ owner: userId }); // find NFTs where the owner field matches the user's ID
    res.json(nfts);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving NFTs", err });
  }
};
