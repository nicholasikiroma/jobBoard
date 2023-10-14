export default (sequelize, Sequelize) => {
  const Wallets = sequelize.define(
    "wallets",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      balance: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      timestamps: true,
    }
  );

  return Wallets;
};
