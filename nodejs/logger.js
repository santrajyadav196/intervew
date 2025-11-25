function logger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    const method = req.method;
    const url = req.originalUrl;
    const responseTime = Date.now() - start;

    console.log(`${method} ${url} - ${responseTime}ms`);
  });

  next();
}
