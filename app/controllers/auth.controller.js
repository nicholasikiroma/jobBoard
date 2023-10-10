import jwtpkg from "jsonwebtoken";
const { sign, verify } = jwtpkg;
import bcrypt from "bcrypt";
import expressAsyncHandler from "express-async-handler";
import { getUserByEmail, getUserByID } from "../services/user.service.js";
import httpStatus from "http-status";
import pkg from "../config/baseConfigs.cjs";
const { jwt } = pkg;

/**
 * @desc Login
 * @route POST /auth
 * @access Public
 */
export const login = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "incorrect email or password" });
  }

  const match = await bcrypt.compare(password, existingUser.hashed_password);

  if (!match) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "unauthorized" });
  }

  const accessToken = sign(
    {
      UserInfo: {
        userId: existingUser.id,
        role: existingUser.role,
      },
    },
    jwt.secret,
    { expiresIn: "1h" }
  );

  const refreshToken = sign({ userId: existingUser.id }, jwt.secret, {
    expiresIn: jwt.refreshExpirationDays,
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.send({ ...existingUser.dataValues, accessToken });
});

/**
 * @desc Refresh access token
 * @route POST /auth/refresh
 * @access Public
 */
export const refresh = expressAsyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ message: "unauthorized" });
  }

  const refreshToken = cookies.jwt;

  verify(
    refreshToken,
    jwt.secret,
    expressAsyncHandler(async (err, decoded) => {
      if (err)
        return res.status(httpStatus.FORBIDDEN).send({ message: "Forbidden" });

      const existingUser = await getUserByID(decoded.userId);

      if (!existingUser) {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .send({ message: "unauthorized" });
      }

      const accessToken = sign(
        {
          UserInfo: {
            userId: existingUser.id,
            role: existingUser.role,
          },
        },
        jwt.secret,
        { expiresIn: "2h" }
      );

      res.send({ accessToken });
    })
  );
});

/**
 * @desc Logout user
 * @access Public
 * @route POST /auth/logout
 */
export const logout = expressAsyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(httpStatus.NO_CONTENT);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Session cleared" });
});
