import express from "express";
import { walletController } from "../controllers/wallets.controller.js";
import jwtRequired from "../middlewares/verifyJWT.js";
import { validator } from "../validators/wallet.validatior.js";
import validate from "../middlewares/validate.js";

const walletRouter = express.Router();

walletRouter.use(jwtRequired);

walletRouter.get("/", walletController.getWallet);

walletRouter.put(
  "/fund",
  validator.fundWallet(),
  validate,
  walletController.fundWallet
);

walletRouter.post(
  "/:userId/wallets/transfer",
  validator.transfer(),
  validate,
  walletController.initiateFundTransfer
);

walletRouter.get("/:walletId/transactions/:transactionId");

export default walletRouter;
