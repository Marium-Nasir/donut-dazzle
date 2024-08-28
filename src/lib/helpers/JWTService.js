import * as JWT from "jsonwebtoken";
export const generateToken = async (id, expireTime) => {
  try {
    return await JWT.sign({ id }, process.env.jwtKey, {
      expiresIn: expireTime,
    });
  } catch (err) {
    console.log(err);
  }
};

export const verifyToken = async (token) => {
  try {
    const verify = await JWT.verify(token, process.env.jwtKey);
    return verify;
  } catch (err) {
    return err.message;
  }
};
