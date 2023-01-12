# 0/1 Knapsack

Put fruits in basket to maximize profits

Items: {Apple, Orange, Banana, Melon}
Weights: {2, 3, 1, 4}
Profits: {4, 5, 3, 7}
Knapsack capacity: 5

## Brute Force DFS

Iterate through each item, and either include or exclude it

// Time: O(2^n) where n is items.length
// Space: O(n) to store recursion stack

```js
function knapsack(profits, weights, capacity) {
  // i tracks index in profits array
  function dfs(i, remain) {
    // base case
    if (capacity <= 0 || i >= profits.length) return 0;

    // include element
    let profit1 = 0;
    // can only include element if its weight is less than remaining capacity
    if (weights[i] <= remain) {
      // profit = profit for current element + dfs on remainder of items
      profit1 = profits[i] + dfs(i + 1, remain - weights[i]);
    }

    // exclude element
    const profit2 = dfs(i + 1, remain);

    return Math.max(profit1, profit2);
  }
  return dfs(0, capacity);
}

const profits = [1, 6, 10, 16];
const weights = [1, 2, 3, 5];

console.log(knapsack(profits, weights, 7));
console.log(knapsack(profits, weights, 6));
```

## Top-Down DP with Memoization

// Time: O(n _ c) n is number of items, c is knapsack capacity
// Space: O(n _ c) for memoization array

Cache using 2D array:

```js
function knapsack(profits, weights, capacity) {
  const dp = [];

  // i tracks index in profits array
  function dfs(i, remain) {
    // base case
    if (capacity <= 0 || i >= profits.length) return 0;
    // check cache
    dp[i] = dp[i] || [];
    if (typeof dp[i][remain] !== "undefined") {
      return dp[i][remain];
    }

    // include element
    let profit1 = 0;
    // can only include element if its weight is less than remaining capacity
    if (weights[i] <= remain) {
      // profit = profit for current element + dfs on remainder of items
      profit1 = profits[i] + dfs(i + 1, remain - weights[i]);
    }

    // exclude element
    const profit2 = dfs(i + 1, remain);

    dp[i][remain] = Math.max(profit1, profit2);
    return dp[i][remain];
  }
  return dfs(0, capacity);
}

const profits = [1, 6, 10, 16];
const weights = [1, 2, 3, 5];

console.log(knapsack(profits, weights, 7));
console.log(knapsack(profits, weights, 6));
```

Alternate caching technique using Map():

```js
function knapsack(profits, weights, capacity) {
  const dp = new Map();

  // i tracks index in profits array
  function dfs(i, remain) {
    // base case
    if (capacity <= 0 || i >= profits.length) return 0;
    // check cache
    const key = `${i}#${remain}`;
    if (dp.has(key)) return dp.get(key);

    // include element
    let profit1 = 0;
    // can only include element if its weight is less than remaining capacity
    if (weights[i] <= remain) {
      // profit = profit for current element + dfs on remainder of items
      profit1 = profits[i] + dfs(i + 1, remain - weights[i]);
    }

    // exclude element
    const profit2 = dfs(i + 1, remain);

    dp.set(key, Math.max(profit1, profit2));
    return dp.get(key);
  }
  return dfs(0, capacity);
}

const profits = [1, 6, 10, 16];
const weights = [1, 2, 3, 5];

console.log(knapsack(profits, weights, 7));
console.log(knapsack(profits, weights, 6));
```

## Bottom-Up DP with Tabulation

// Time: O(n _ c) n is number of items, c is knapsack capacity
// Space: O(n _ c) for tabulation array

```js
function knapsack(profits, weights, capacity) {
  // number of items
  const n = profits.length;

  // edge cases
  if (capacity <= 0 || n === 0 || weights.length !== n) return 0;

  // create 2D dp array
  const dp = [];
  for (let i = 0; i < n; i++) {
    dp.push(new Array(capacity + 1).fill(0));
  }

  // if only one weight, take it if not more than capacity
  for (let c = 0; c < capacity.length + 1; c++) {
    if (weight[0] <= c) {
      dp[0][c] = profits[0];
    }
  }

  for (let i = 1; i < n + 1; i++) {
    for (let c = 1; c < capacity.length + 1; c++) {
      let profit 1 = 0, profit2 = 0;
      // include new item
      if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];
      // exclude
      profit2 = dp[i - 1][c];
      // take maximum
      dp[i][c] = Math.max(profit1, profit2);
    }
  }
  // max profit at bottom-right corner
  return dp[n - 1][capacity];
}

const profits = [1, 6, 10, 16];
const weights = [1, 2, 3, 5];

console.log(knapsack(profits, weights, 7));
console.log(knapsack(profits, weights, 6));
```
