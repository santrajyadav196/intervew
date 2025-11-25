function createRateLimiter(rateLimit) {
  let running = 0;
  const queue = [];

  async function runTask(task) {
    try {
      await task();
    } finally {
      running--;
      if (queue.length > 0) {
        const nextTask = queue.shift();
        execute(nextTask);
      }
    }
  }

  function execute(task) {
    if (running < rateLimit) {
      running++;
      runTask(task);
    } else {
      queue.push(task);
    }
  }

  return { execute };
}

const limiter = createRateLimiter(3); // Limit to 3 concurrent tasks

for (let i = 0; i < 10; i++) {
  limiter.execute(async () => {
    console.log(`Starting task ${i}`);
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Simulate delay
    console.log(`Finished task ${i}`);
  });
}
