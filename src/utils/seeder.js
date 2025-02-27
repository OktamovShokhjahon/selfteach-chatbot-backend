import mongoose from "mongoose";
import Subject from "../models/Subject.js";
import Topic from "../models/Topic.js";
import { subjects, topics } from "../data/seedData.js";
import dotenv from "dotenv";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Subject.deleteMany();
    await Topic.deleteMany();
    console.log("Existing data cleared");

    // Insert subjects
    const createdSubjects = await Subject.insertMany(subjects);
    console.log("Subjects seeded successfully");

    // Create topics with commands for each subject
    for (let subject of createdSubjects) {
      const subjectTopics = topics[subject.name] || [];

      // Create topics with commands
      const createdTopics = await Topic.insertMany(
        subjectTopics.map((topic) => ({
          ...topic,
          subject: subject._id,
        }))
      );

      console.log(`Topics and commands created for ${subject.name}`);
    }

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
