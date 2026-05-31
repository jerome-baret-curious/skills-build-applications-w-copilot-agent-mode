import { Schema, model, Types } from 'mongoose';

export interface IActivity {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned?: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: Number,
  caloriesBurned: Number,
  date: { type: Date, required: true, default: () => new Date() },
});

export const Activity = model<IActivity>('Activity', activitySchema);
