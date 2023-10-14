import asycnHandler from "express-async-handler";
import httpStatus from "http-status";
import { walletService } from "../services/wallets.service.js";
import { transactionService } from "../services/transactions.service.js";
import logger from "../config/logger.js";

// fetch wallet
const getWallet = asycnHandler(async (req, res) => {
  const wallet = await walletService.fetchWallet(req.walletId);
  res.status(httpStatus.OK).send(wallet);
});

// transfer funds from one wallet to another
const initiateFundTransfer = asycnHandler(async (req, res) => {
  const data = req.body;
  await transactionService.createTransaction(data);
  res.status(httpStatus.CREATED).send({ message: "Transfer succesful" });
});

// fund user wallet
const fundWallet = asycnHandler(async (req, res) => {
  const { amount } = req.body;
  const id = req.user;

  const wallet = await walletService.fetchWallet(req.walletId);

  await walletService.updateWalletBalance(wallet.id, wallet.balance + amount);

  res.status(httpStatus.OK).send({ message: "Funding successful!" });
});

export const walletController = {
  fundWallet,
  initiateFundTransfer,
  getWallet,
};
