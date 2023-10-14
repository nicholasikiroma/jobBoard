import { Sequelize } from "sequelize";
import logger from "../config/logger.js";
import pkg from "../config/baseConfigs.cjs";
import userModels from "./users.model.js";
import jobPostingModels from "./jobPosting.model.js";
import applicationModels from "./applications.model.js";
import skillsModels from "./skills.model.js";
import userSkillsModels from "./userSkills.model.js";
import reviewsModel from "./reviews.model.js";
import transactionsModels from "./transactions.models.js";
import walletsModel from "./wallets.model.js";
const { sequelize } = pkg;

const dB = {};
const sequelizeInstance = new Sequelize(
  sequelize.database,
  sequelize.user,
  sequelize.password,
  {
    host: sequelize.host,
    dialect: "postgres",
  }
);

sequelizeInstance
  .authenticate()
  .then(() => {
    logger.info("Database is good");
  })
  .catch((err) => {
    logger.error("Failed to connect to database", err);
  });

dB.Sequelize = Sequelize;
dB.sequelize = sequelizeInstance;

dB.users = userModels(sequelizeInstance, Sequelize);
dB.jobPostings = jobPostingModels(sequelizeInstance, Sequelize);
dB.applications = applicationModels(sequelizeInstance, Sequelize);
dB.skills = skillsModels(sequelizeInstance, Sequelize);
dB.userSkills = userSkillsModels(sequelizeInstance, Sequelize);
dB.reviews = reviewsModel(sequelizeInstance, Sequelize);
dB.transactions = transactionsModels(sequelizeInstance, Sequelize);
dB.wallets = walletsModel(sequelizeInstance, Sequelize);

// associations
function associateModels() {
  dB.users.hasMany(dB.jobPostings, {
    foreignKey: "employer_id",
    as: "employerJobs",
    onDelete: "CASCADE",
  });

  dB.users.hasMany(dB.jobPostings, {
    foreignKey: "freelancer_id",
    as: "freelancerJobs",
  });

  dB.users.hasMany(dB.applications, {
    foreignKey: "freelancer_id",
    as: "freelancerApplications",
    onDelete: "CASCADE",
  });

  dB.jobPostings.hasMany(dB.applications, {
    foreignKey: "job_posting_id",
    as: "applications",
    onDelete: "CASCADE",
  });

  dB.users.belongsToMany(dB.skills, {
    through: dB.userSkills,
    foreignKey: "user_id",
    otherKey: "skill_id",
    as: "skills",
  });

  dB.wallets.hasOne(dB.users, {
    foreignKey: "wallet_id",
  });

  dB.users.belongsTo(dB.wallets, {
    foreignKey: "wallet_id",
    onDelete: "CASCADE",
  });

  dB.wallets.hasMany(dB.transactions, {
    foreignKey: "wallet_id",
    as: "transactions",
    onDelete: "CASCADE",
  });

  dB.transactions.belongsTo(dB.wallets, {
    foreignKey: "wallet_id",
  });

  dB.reviews.hasOne(dB.jobPostings, {
    foreignKey: "review_id",
  });

  dB.jobPostings.belongsTo(dB.reviews, {
    foreignKey: "review_id",
    onDelete: "CASCADE",
  });
}

associateModels();

export default dB;
