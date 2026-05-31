import { Schema, model, Types } from 'mongoose';

export interface ILeaderboardEntry {
  user: Types.ObjectId;
  rank: number;
  points: number;
  category: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
});

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
