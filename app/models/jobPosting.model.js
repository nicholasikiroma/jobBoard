export default (sequelize, Sequelize) => {
  const JobPostings = sequelize.define(
    "job_postings",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      budget: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      employer_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      freelancer_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(["open", "in-progress", "completed"]),
        allowNull: false,
        defaultValue: "open",
      },
      skillLeve: {
        type: Sequelize.ENUM(["beginner", "intermediate", "expert"]),
        allowNull: false,
        defaultValue: "beginner",
      },
    },
    {
      timestamps: true,
    }
  );
  return JobPostings;
};
