import mongoose from "mongoose";
import { seedProductData } from "./seedProductData.js";

(async () => {
  try {
    console.log("🌱 Starting database seeding...");
    await seedProductData();
    console.log("✅ Seeding completed successfully.");
  } catch (error) {
    console.error("❌ Seeding Error:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB connection closed.");
  }
})();
