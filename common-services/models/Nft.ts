import mongoose, { Document, Schema } from "mongoose";

interface INft extends Document {
  name: string;
  description: string;
  imageUrl: string;
  owner: Schema.Types.ObjectId;
  transactionHash: string;
  tokenURI: string;
  tokenId: string;
}

const NftSchema = new Schema<INft>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  transactionHash: { type: String, required: true, unique: true },
  tokenURI: { type: String, required: true, unique: true },
  tokenId: { type: String, required: true, unique: true },
});

export default mongoose.model<INft>("Nft", NftSchema);
