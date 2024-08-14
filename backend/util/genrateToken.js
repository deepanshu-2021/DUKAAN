import JWT from "jsonwebtoken";
export const genreateToken = (res, id) => {
  const token = JWT.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};
