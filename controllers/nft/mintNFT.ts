import { Response } from "express";
import Nft from "../../common-services/models/Nft";
import { CustomRequest } from "../../common-services/types/request";
import Web3 from "web3";
import pinataSDK from "@pinata/sdk";
import { MintableNFTAbi } from "../../smart-contracts/MintableNFT/Abi";
import User from "../../common-services/models/User";

// Define the uploadToIPFS function
async function uploadToIPFS(file: object) {
  const pinata = new pinataSDK({
    pinataJWTKey: process.env.PINATA_JWT_TOKEN as string,
  });
  const result = await pinata.pinJSONToIPFS(file);
  return process.env.PINATA_IPFS_BASE_URL + result.IpfsHash;
}

export const mintNFT = async (req: CustomRequest, res: Response) => {
  // Get the NFT data from the request body
  const { name, description, image } = req.body;

  // Validate that the necessary data is present
  if (!name || !description || !image) {
    res.status(400).json({
      message: "Name, description, and image are required to mint an NFT",
    });
    return;
  }

  try {
    // Create metadata
    const metadata = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
    };

    // Upload metadata to IPFS
    const tokenURI = await uploadToIPFS(metadata);
    const web3 = new Web3(
      new Web3.providers.HttpProvider(process.env.INFURA_URL as string)
    );
    const nonce = await web3.eth.getTransactionCount(
      process.env.ACCOUNT_ADDRESS as string,
      "latest"
    );

    const contract = new web3.eth.Contract(
      MintableNFTAbi,
      process.env.ACCOUNT_ADDRESS as string
    ) as any;

    const user = await User.findOne({ _id: req.user._id });

    const tx = {
      from: process.env.ACCOUNT_ADDRESS as string,
      to: process.env.CONTRACT_ADDRESS as string,
      nonce: nonce,
      gas: web3.utils.toHex(2100000),
      gasPrice: web3.utils.toHex(20 * 1e9),
      data: contract.methods.mintNFT(user?.ethAddress, tokenURI).encodeABI(),
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      tx,
      process.env.ACCOUNT_PRIVATE_KEY as string
    );
    const transactionReciept: any = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    const newNFT = new Nft({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.image,
      owner: req.user._id,
      transactionHash: transactionReciept.transactionHash,
      tokenURI: tokenURI,
      tokenId: transactionReciept.logs[0].topics[3],
    });

    const savedNFT = await newNFT.save();
    res.json(savedNFT);
  } catch (error) {
    res.status(500).json({ message: "Error minting NFT", error });
  }
};
