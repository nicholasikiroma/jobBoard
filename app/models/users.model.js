import bcrypt from "bcrypt";
import dB from "./index.js";
import { APIError } from "../config/error.js";
import httpStatus from "http-status";

export default (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hashed_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM(["freelancer", "employer", "admin"]),
        defaultValue: "freelancer",
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      skill: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  // Hash the password before saving
  Users.beforeCreate(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.hashed_password, saltRounds);
    user.hashed_password = hashedPassword;
  });

  Users.beforeCreate(async (user, options) => {
    const transaction = options.transaction;
    try {
      const wallet = await dB.wallets.create({ transaction });
      if (!wallet) {
        throw new Error("Failed to create user wallet");
      }
      user.wallet_id = wallet.id;
    } catch (error) {
      throw new APIError(
        "Internal Server Error",
        httpStatus.INTERNAL_SERVER_ERROR,
        true,
        error.message
      );
    }
  });

  Users.beforeUpdate(async (user) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.hashed_password, saltRounds);
    user.hashed_password = hashedPassword;
  });

  return Users;
};
