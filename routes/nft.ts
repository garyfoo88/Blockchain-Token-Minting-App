import express from "express";
import { mintNFT } from "../controllers/nft/mintNFT";
import { getNFTs } from "../controllers/nft/getNFTs";
import { getNFTDetails } from "../controllers/nft/getNFTDetails";
import { authenticateToken } from "../middleware/auth/authenticateToken";
import { nftLimiter } from "../middleware/nft/nftLimiter";

const router = express.Router();

router.post("/mint", [authenticateToken, nftLimiter], mintNFT);
router.get("/", authenticateToken, getNFTs);
router.get("/details/:id", authenticateToken, getNFTDetails);

export default router;
