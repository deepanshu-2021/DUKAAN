import JWT from "jsonwebtoken";
//cookie and token life set to 2 days
export const genreateToken = (res, id) => {
  const token = JWT.sign({ userId: id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "None",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
};
