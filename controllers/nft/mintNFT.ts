import { Response } from "express";
import { CustomRequest } from "../../common-services/types/request";
import { makeUserService } from "../../common-services/services/user/makeUserService";
import { makeNFTService } from "../../common-services/services/nft/makeNFTService";

export const mintNFT = async (req: CustomRequest, res: Response) => {
  const { name, description, imageUrl } = req.body;

  if (!name || !description || !imageUrl) {
    res.status(400).json({
      message: "Name, description, and image are required to mint an NFT",
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
    const user = await userService.getUserById(req.user._id);

    const nftService = makeNFTService();
    const savedNFT = await nftService.mintNFT(user, metadata);

    res.json(savedNFT);
  } catch (error) {
    res.status(500).json({ message: "Error minting NFT", error });
  }
};
