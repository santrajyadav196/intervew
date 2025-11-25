function maxProfit(prices) {
  let maxProfit = 0;
  for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      const maxDiff = prices[j] - prices[i];

      maxProfit = Math.max(maxProfit, maxDiff);
    }
  }
  return maxProfit;
}

function maxProfit(prices) {
  let minSoFar = prices[0];
  let result = 0;
  // Update the minimum value seen so far
  // if we see smaller
  for (let i = 1; i < prices.length; i++) {
    minSoFar = Math.min(minSoFar, prices[i]);
    const maxDiff = prices[i] - minSoFar;

    // Update result if we get more profit
    result = Math.max(result, maxDiff);
  }
  return result;
}

console.log(maxProfit([7, 10, 1, 3, 6, 9, 2]));
//8; // Buy at 1, sell at 9
