import jwt from "jsonwebtoken";
import UserToken from "../models/UserToken.js";

const generateTokens = async (user) => {
  try {
    const payload = {
      _id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "14m" }
    );
    const refreshToken = jwt.sign(
      { _id: payload._id, role: payload.role },
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    await UserToken.deleteOne({ userId: user._id });

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

export default generateTokens;
