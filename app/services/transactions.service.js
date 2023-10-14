import httpStatus from "http-status";
import dB from "../models/index.js";
import { walletService } from "./wallets.service.js";
import { APIError } from "../config/error.js";

// create transaction
async function newTransaction(data) {
  const newTransaction = await dB.transactions.create({ ...data });
  if (!newTransaction) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      "Failed to create transaction"
    );
  }
}

// fetch transaction
async function getTransaction(transactionId) {
  const transaction = await dB.transactions.findByPk(transactionId);
  if (!transaction) {
    throw new APIError(
      "Not Found",
      httpStatus.NOT_FOUND,
      true,
      "Transaction not found"
    );
  }
}

async function getAllTransactions(wallet_id) {
  const transactions = await dB.transactions.findAll({
    where: { wallet_id },
  });
  if (!transactions) {
    throw new APIError(
      "Not Found",
      httpStatus.NOT_FOUND,
      true,
      "Transactions not found"
    );
  }
  return transactions;
}

async function createTransaction(data) {
  // create a debit and credit transaction records
  const senderWallet = await walletService.fetchWallet(data.from);
  const receiverWallet = await walletService.fetchWallet(data.to);

  try {
    await dB.sequelize.transaction(async (t) => {
      await dB.transactions.create(
        {
          from: data.from,
          to: data.to,
          amount: data.amount,
          narration: data.narration,
          type: "debit",
          status: "success",
          wallet_id: senderWallet.id,
        },
        { transaction: t }
      );

      await dB.transactions.create(
        {
          from: data.from,
          to: data.to,
          amount: data.amount,
          narration: data.narration,
          type: "credit",
          status: "success",
          wallet_id: receiverWallet.id,
        },
        { transaction: t }
      );

      // fund sender wallet
      await senderWallet.update(
        { balance: senderWallet.balance - data.amount },
        { transaction: t }
      );

      // fund receiver wallet
      await receiverWallet.update(
        { balance: receiverWallet.balance + data.amount },
        { transaction: t }
      );
    });
  } catch (error) {
    throw new APIError(
      "Internal Server Error",
      httpStatus.INTERNAL_SERVER_ERROR,
      true,
      error.message
    );
  }
  return true;
}

export const transactionService = {
  getAllTransactions,
  getTransaction,
  newTransaction,
  createTransaction,
};
