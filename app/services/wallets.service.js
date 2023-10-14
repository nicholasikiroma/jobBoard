import httpStatus from "http-status";
import { APIError } from "../config/error.js";
import dB from "../models/index.js";

// fetch wallet
async function fetchWallet(wallet_id) {
  const wallet = await dB.wallets.findByPk(wallet_id, {
    include: [dB.users],
  });

  if (!wallet) {
    throw new APIError(
      "Not found",
      httpStatus.NOT_FOUND,
      true,
      "wallet not found"
    );
  }

  return wallet;
}

// update wallet balance

async function updateWalletBalance(wallet_id, newBalance) {
  const wallet = await dB.wallets.update(
    { balance: newBalance },
    {
      where: {
        id: wallet_id,
      },
    }
  );

  if (!wallet) {
    throw new APIError(
      "Not found",
      httpStatus.NOT_FOUND,
      true,
      "wallet not found"
    );
  }

  return wallet;
}

export const walletService = {
  fetchWallet,
  updateWalletBalance,
};
