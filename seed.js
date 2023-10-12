import logger from "./app/config/logger.js";
import dB from "./app/models/index.js";

const seedDatabase = async () => {
  try {
    // Create the admin user
    const adminUser = await dB.users.create({
      email: "admin@example.com",
      hashed_password: "admin", // Replace with the desired password
      role: "admin",
      first_name: "Admin",
      last_name: "User",
    });

    // Create two freelancer users
    const freelancer1 = await dB.users.create({
      email: "freelancer1@example.com",
      hashed_password: "password", // Replace with the desired password
      role: "freelancer",
      skill: "Developer",
      first_name: "Freelancer1",
      last_name: "User",
    });

    const freelancer2 = await dB.users.create({
      email: "freelancer2@example.com",
      hashed_password: "password", // Replace with the desired password
      role: "freelancer",
      skill: "Marketer",
      first_name: "Freelancer2",
      last_name: "User",
    });

    // Create one employer user
    const employerUser = await dB.users.create({
      email: "employer@example.com",
      hashed_password: "password",
      role: "employer",
      first_name: "Employer",
      last_name: "User",
      company: "Example Company", // Add company information
    });

    logger.info("Seed data created successfully.");
  } catch (error) {
    logger.error("Error seeding the database:", error);
  }
};

export default seedDatabase;
