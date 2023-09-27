import { Sequelize } from "sequelize";
import logger from "../config/logger.js";
import pkg from "../config/baseConfigs.cjs";
const { sequelize } = pkg;
import userModels from "./user.model.js";
import jobPostingModels from "./jobPosting.model.js";
import applicationModels from "./application.model.js";
import skillsModels from "./skills.model.js";
import userSkillsModels from "./userSkills.model.js";

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

// association
function associateModels() {
  dB.users.hasMany(dB.jobPostings, {
    foreignKey: "employer_id",
    as: "employerJobs",
  });

  dB.users.hasMany(dB.jobPostings, {
    foreignKey: "freelancer_id",
    as: "freelancerJobs",
  });

  dB.jobPostings.hasMany(dB.applications, {
    foreignKey: "job_posting_id",
    as: "applications",
  });

  dB.users.belongsToMany(dB.skills, {
    through: dB.userSkills,
    foreignKey: "user_id",
    otherKey: "skill_id",
    as: "skills",
  });
}

associateModels();

export default dB;
