import { Sequelize } from "sequelize";
import logger from "./app/utils/logger.js";

const dB = {};

const sequelizeInstance = new Sequelize();

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

dB.users = require("./user.model.js")(sequelizeInstance, Sequelize);
dB.jobPostings = require("./jobPosting.model.js")(sequelizeInstance, Sequelize);
dB.applications = require("./application.model.js")(
  sequelizeInstance,
  Sequelize
);
dB.skills = require("./skills.model.js")(sequelizeInstance, Sequelize);
dB.userSkills = require("./userSkills.model.js")(sequelizeInstance, Sequelize);

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

// method
associateModels();

export default dB;
