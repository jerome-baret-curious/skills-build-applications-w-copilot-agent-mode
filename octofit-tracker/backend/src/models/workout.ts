import { Schema, model } from 'mongoose';

export interface IWorkout {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: string;
  tags: string[];
  scheduledFor: Date;
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true },
  tags: [{ type: String }],
  scheduledFor: { type: Date, required: true },
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
