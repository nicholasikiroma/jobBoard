import { Op } from "sequelize";
import dB from "./index.js";

export default (sequelize, Sequelize) => {
  const Applications = sequelize.define(
    "applications",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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
    }
  );

  Applications.beforeUpdate(async (application, options) => {
    if (application.changed("status") && application.status == "accepted") {
      const { job_posting_id, id } = application;
      await Applications.update(
        { status: "declined" },
        {
          where: {
            job_posting_id,
            id: { [Op.ne]: id },
          },
        }
      );

      await dB.jobPostings.update(
        { status: "in-progress", freelancer_id: application.freelancer_id },
        {
          where: {
            id: job_posting_id,
          },
        }
      );
    }
  });

  return Applications;
};
