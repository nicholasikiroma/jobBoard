import httpStatus from "http-status";
import pkg from "../config/baseConfigs.cjs";
const { jwt } = pkg;
import jwtpkg from "jsonwebtoken";
const { verify } = jwtpkg;

const jwtRequired = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  verify(token, jwt.secret, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(httpStatus.FORBIDDEN)
        .send({ message: "invalid or expired token" });
    }
    req.user = decoded.UserInfo.userId;
    req.role = decoded.UserInfo.role;
    req.walletId = decoded.UserInfo.walletId;
    next();
  });
};

export default jwtRequired;
