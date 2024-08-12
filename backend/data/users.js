import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin one",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "User One",
    email: "userone@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
  {
    name: "User Two",
    email: "usertwo@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: false,
  },
];
export default users;
