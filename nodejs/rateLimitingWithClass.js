class RateLimiter {
  constructor(rateLimit) {
    this.rateLimit = rateLimit;
    this.running = 0;
    this.queue = [];
  }

  async execute(task) {
    if (this.running < this.rateLimit) {
      this.running++;
      await this._runTask(task);
    } else {
      this.queue.push(task);
    }
  }

  async _runTask(task) {
    try {
      await task();
    } finally {
      this.running--;
      if (this.queue.length > 0) {
        const nextTask = this.queue.shift();
        this.execute(nextTask);
      }
    }
  }
}

// Usage
const limiter = new RateLimiter(3);

for (let i = 0; i < 10; i++) {
  limiter.execute(async () => {
    console.log(`Starting task ${i}`);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate async task
    console.log(`Finished task ${i}`);
  });
}
