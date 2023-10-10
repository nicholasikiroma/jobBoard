import dB from "../models/index.js";

/**
 *
 * @returns
 */
export async function getUsers() {
  try {
    const users = await dB.users.findAll({
      attributes: { exclude: ["hashed_password"] },
    });
    return users;
  } catch (err) {
    throw new Error("Something went wrong");
  }
}

/**
 *
 * @param {Array} data
 * @returns
 */
export async function newUser(data) {
  try {
    const user = await dB.users.create({ ...data });
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 *
 * @param {ObjectId} userId
 * @returns
 */
export async function getUserByID(userId) {
  try {
    const user = await dB.users.findByPk(userId);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 *
 * @param {string} email
 * @returns
 */
export async function getUserByEmail(email) {
  try {
    const user = await dB.users.findOne({ where: { email: email } });
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
}

/**
 *
 * @param {*} data
 * @param {*} userId
 * @returns
 */
export async function updateUser(data, userId) {
  try {
    const user = await dB.users.update(
      { ...data },
      {
        where: {
          id: userId,
        },
      }
    );
    return user;
  } catch (err) {
    throw new Error(err);
  }
}

/**
 *
 * @param {*} userId
 * @returns
 */
export async function removeUser(userId) {
  try {
    const user = await dB.users.destroy({
      where: {
        id: userId,
      },
    });
    return user;
  } catch (err) {
    throw new Error(err);
  }
}
