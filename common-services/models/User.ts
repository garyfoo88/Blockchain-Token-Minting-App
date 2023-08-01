import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  ethAddress: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ethAddress: { type: String, required: true, unique: true },
});

export default mongoose.model<IUser>('User', UserSchema);
