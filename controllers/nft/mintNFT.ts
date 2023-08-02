import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeUserService } from "../../common-services/services/user/makeUserService";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";
import { HttpExceptionError } from "../../common-services/utils/errors";

export const mintNFT = async (req: CustomRequest, res: Response) => {
  const { name, description, imageUrl } = req.body;
  const userId = req.user._id;

  if (!name || !description || !imageUrl) {
    throw new HttpExceptionError(400, "Missing required fields");
  }

  try {
    const metadata = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    };

    const userService = makeUserService();
    const user = await userService.getUserById(userId);

    const nftService = makeNFTService();
    const savedNFT = await nftService.mintNFT(user, metadata);

    res.status(201).json(savedNFT);
  } catch (error: any) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error minting NFT", error });
    }
  }
};
