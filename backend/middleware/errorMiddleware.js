const notFound = (req, res, next) => {
  const err = new Error(`Not found ${req.originalUrl}`);
  res.status(404);
  next(err);
};
const erorrHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    message = "resource not found";
    statusCode = 404;
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
export { notFound, erorrHandler };
