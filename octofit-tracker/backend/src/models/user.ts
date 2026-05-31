import { Schema, model, Types } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  team?: Types.ObjectId;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, default: 'member' },
  team: { type: Types.ObjectId, ref: 'Team' },
  joinedAt: { type: Date, required: true, default: () => new Date() },
});

export const User = model<IUser>('User', userSchema);
