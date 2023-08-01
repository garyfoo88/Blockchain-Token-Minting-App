import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeUserService } from "../../common-services/services/user/makeUserService";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";

export const mintNFT = async (req: CustomRequest, res: Response) => {
  const { name, description, imageUrl } = req.body;
  const userId = req.user._id;

  if (!name || !description || !imageUrl) {
    res.status(400).json({
      message: "Missing required fields",
    });
    return;
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

    res.json(savedNFT);
  } catch (error) {
    res.status(500).json({ message: "Error minting NFT", error });
  }
};
