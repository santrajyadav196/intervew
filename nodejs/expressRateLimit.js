function rateLimiter({ maxRequests, windowMs }) {
  const ipRequests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();

    if (!ipRequests.has(ip)) {
      ipRequests.set(ip, []);
    }

    const timestamps = ipRequests.get(ip);

    // Filter out timestamps outside the time window
    const recentTimestamps = timestamps.filter(
      (requestTime) => currentTime - requestTime < windowMs
    );

    if (recentTimestamps.length >= maxRequests) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    //add the current timestamp to the list of recent timestamps
    recentTimestamps.push(currentTime);
    // push all the recent timestampt to store
    ipRequests.set(ip, recentTimestamps);
    next();
  };
}

module.exports = rateLimiter;

// app.use(rateLimiter({ maxRequests: 5, windowMs: 10000 }));

class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.ipRequests = new Map();
  }

  middleware(req, res, next) {
    const ip = req.ip;
    const currentTime = Date.now();
    if (!this.ipRequests(ip)) {
      this.ipRequests.set(ip, []);
    }
    const timestamps = this.ipRequests.get(ip);
    const recentTimestamps = timestamps.filter((requestTime) => {
      return currentTime - requestTime < this.windowMs;
    });

    if (recentTimestamps.length > this.maxRequests) {
      return res.status(409).json({
        message: "Too many requests. Please try again later.",
      });
    }

    recentTimestamps.push(currentTime);
    this.ipRequests.set(ip, recentTimestamps);
    next();
  }
}

// const limiter = new RateLimiter({
//   maxRequests: 5,
//   windowMs: 15 * 1000, // 15 seconds
// });

// app.use(limiter.middleware);
