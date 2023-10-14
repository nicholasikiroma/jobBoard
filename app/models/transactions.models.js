import dB from "./index.js";
import { APIError } from "../config/error.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

export default (sequelize, Sequelize) => {
  const Transactions = sequelize.define(
    "transactions",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      to: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      from: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      narration: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(["credit", "debit"]),
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(["failed", "success"]),
        allowNull: false,
        defaultValue: "failed",
      },
    },
    {
      timestamps: true,
    }
  );

  Transactions.addHook(
    "beforeCreate",
    "createTransactionRecord",
    async (transaction, options) => {
      const senderWallet = await dB.wallets.findByPk(transaction.from);
      if (senderWallet.balance < transaction.amount) {
        throw new APIError(
          "Not Accepted",
          httpStatus.NOT_ACCEPTABLE,
          true,
          "Insufficient balance"
        );
      }
    }
  );

  return Transactions;
};
