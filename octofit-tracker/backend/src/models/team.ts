import { Schema, model, Types } from 'mongoose';

export interface ITeam {
  name: string;
  members: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  members: [{ type: Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, required: true, default: () => new Date() },
});

export const Team = model<ITeam>('Team', teamSchema);
