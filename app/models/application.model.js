export default (sequelize, Sequelize) => {
  const Applications = sequelize.define(
    "applications",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUID4,
      },
      job_posting_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      freelancer_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      employer_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      pitch: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(["pending", "accepted", "declined"]),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      timestamps: true,
      updatedAt: false,
    }
  );
  return Applications;
};
