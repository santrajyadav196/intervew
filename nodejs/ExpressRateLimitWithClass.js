class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.ipRequested = new Map();
  }
  middleware(req, res, next) {
    const ip = req.ip;
    const now = Date.now();
    const timestamps = this.ipRequested.get(ip);

    const recentTimestamps = timestamps.filter((requestedTime) => {
      return now - requestedTime < this.windowMs;
    });

    if (recentTimestamps.length > this.maxRequests) {
      return res.status(429).send("Too Many Requests");
    }

    recentTimestamps.push(now);
    this.ipRequested.set(ip, recentTimestamps);
    next();
  }
}

// const limiter = new RateLimiter({
//   maxRequests: 5,
//   windowMs: 15 * 1000, // 15 seconds
// });

// app.use(limiter.middleware);
