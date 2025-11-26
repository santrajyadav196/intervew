const express = require("express");
const app = express();

// Logger middleware
function logger(req, res, next) {
  const start = Date.now();

  // Listen for when the response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next(); // Pass control to next middleware/route
}

// Use middleware for all routes
app.use(logger);

// Sample route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
