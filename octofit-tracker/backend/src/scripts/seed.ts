import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

// Seed the octofit_db database with test data
async function seedDatabase() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
  console.log('Seed the octofit_db database with test data');
  console.log('Connecting to MongoDB:', uri);

  await mongoose.connect(uri, {
    autoIndex: true,
  });

  console.log('Connected to MongoDB for seeding.');

  try {
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { name: 'Ava Morgan', email: 'ava.morgan@example.com', role: 'athlete' },
      { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'coach' },
      { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'athlete' },
    ]);

    const teams = await Team.create([
      { name: 'Sunrise Sprinters', members: [users[0]._id, users[2]._id] },
      { name: 'Core Crushers', members: [users[1]._id] },
    ]);

    await Promise.all([
      User.updateOne({ _id: users[0]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[2]._id }, { team: teams[0]._id }),
      User.updateOne({ _id: users[1]._id }, { team: teams[1]._id }),
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'Running',
        durationMinutes: 45,
        distanceKm: 9.2,
        caloriesBurned: 520,
        date: new Date('2026-05-25T07:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Cycling',
        durationMinutes: 60,
        distanceKm: 21.4,
        caloriesBurned: 630,
        date: new Date('2026-05-26T10:00:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 430,
        date: new Date('2026-05-26T17:45:00Z'),
      },
    ]);

    const leaderboard = await LeaderboardEntry.create([
      { user: users[0]._id, rank: 1, points: 2470, category: 'Overall' },
      { user: users[2]._id, rank: 2, points: 2190, category: 'Overall' },
      { user: users[1]._id, rank: 1, points: 1800, category: 'Coaches' },
    ]);

    const workouts = await Workout.create([
      {
        title: 'Morning Power HIIT',
        description: 'A fast-paced interval workout for strength and endurance.',
        durationMinutes: 30,
        difficulty: 'Intermediate',
        tags: ['HIIT', 'strength', 'endurance'],
        scheduledFor: new Date('2026-06-01T06:00:00Z'),
      },
      {
        title: 'Recovery Yoga Flow',
        description: 'Gentle mobility and stretching to support recovery.',
        durationMinutes: 40,
        difficulty: 'Beginner',
        tags: ['yoga', 'mobility', 'recovery'],
        scheduledFor: new Date('2026-06-02T08:00:00Z'),
      },
    ]);

    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, ${workouts.length} workouts.`);
    console.log('Sample data inserted successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

seedDatabase();
