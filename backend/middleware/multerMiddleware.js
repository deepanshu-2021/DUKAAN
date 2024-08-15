import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/public/images/");
  },
  filename: function (req, file, cb) {
    const prfix = Date.now() + Math.random() * 1e5;
    cb(null, prfix + file.originalname);
  },
});

export const upload = multer({ storage });
