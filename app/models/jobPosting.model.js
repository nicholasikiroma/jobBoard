export default (sequelize, Sequelize) => {
  const JobPostings = sequelize.define(
    "job_postings",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUID4,
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
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(["open", "pending", "completed"]),
        allowNull: true,
        defaultValue: "open",
      },
    },
    {
      timestamps: true,
    }
  );
  return JobPostings;
};
