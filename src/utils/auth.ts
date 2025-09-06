import bcrypt from "bcryptjs";
import jsonWebToken from "jsonwebtoken";

export const hashPassword = async function (password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

export const verifyPassword = async function (
  password: string,
  hashedPassword: string
) {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

export const generateAccessToken = function (data: Record<string, string>) {
  const token = jsonWebToken.sign(
    { ...data },
    process.env.AccessTokenSecretKey as string,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

export const verifyAccessToken = function (token: string) {
  const decodedToken = jsonWebToken.verify(
    token,
    process.env.AccessTokenSecretKey as string
  );
  return decodedToken;
};
