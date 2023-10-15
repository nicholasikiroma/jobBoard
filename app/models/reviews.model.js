export default (sequelize, Sequelize) => {
  const Reviews = sequelize.define(
    "reviews",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      employer_review: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      freelancer_review: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // update jobposting table with review id

  return Reviews;
};
