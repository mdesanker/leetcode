/**
 * @param {number} n
 * @return {number}
 */
// Recursion
var climbStairs = function (n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + Memoization
var climbStairs = function (n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return n;
  return (memo[n] = climbStairs(n - 1, memo) + climbStairs(n - 2, memo));
};

// Time: O(n)
// Space: O(n)

// Tabulation
var climbStairs = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i < n + 1; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)

// Tabulation - Constant space
var climbStairs = function (n) {
  if (n <= 2) return n;
  let one = 1,
    two = 2;
  for (let i = 3; i < n + 1; i++) {
    let curr = one + two;
    one = two;
    two = curr;
  }
  return two;
};

// Time: O(n)
// Space: O(1)

/**
For this problem we can start by drawing out the decision tree to see that it is a DP problem
This will show that there are sub problems we can solve, and also that this is a Fibonacci sequence problem

We can make 2 decisions at every level, so the time complexity of the decision tree is 2^height of tree which is 2^n
We see what we have several sub problems being repeated. We can store these results (memoize) so that we aren't repeating work
Then we solve every sub problem only once
This makes the time complexity O(n) for recursion and memoization

Once we see this is a Fibonacci sequence, we can build out the bottom up dyanmic programming problem relatively easily
Bottom up means we start at the base case and work upward
The base cases are n = 1, which is 1, and n = 2, which is 2.
We can store these values in variables, one and two respectively
Then we loop up to n

The third number is the sum of the two previous numbers (one + two)
Then we set one to two, and two to tree
The value of two is the ith Fibonacci number, so that is what we return

TC: O(n) we iterate up to n once
SC: O(1) no additional memory is needed because we only used variables to store info
 */
