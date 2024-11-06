import mongoose from 'mongoose';
import User from '@/lib/database/models/user.model'; // Adjust the path to your User model file
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

// Replace these details with the data for the user you'd like to seed
const seedUser = {
  clerkId: 'clerk_unique_id',
  email: 'user@example.com',
  username: 'user123',
  firstName: 'John',
  lastName: 'Doe',
  photo: 'https://example.com/photo.jpg',
};

async function seed() {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI || '');

    // Clear existing users to avoid duplicate seed entries
    await User.deleteMany({});

    // Seed the user
    const user = new User(seedUser);
    await user.save();

    console.log('User seeded successfully:', user);
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
  }
}

// Run the seed function
seed();
