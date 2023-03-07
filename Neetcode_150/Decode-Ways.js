/**
 * @param {string} s
 * @return {number}
 */
// Recursion
var numDecodings = function (s) {
  const n = s.length;
  // edge case
  if (s[0] === "0") return 0;

  function dp(i) {
    // base cases
    if (s[i] === "0") return 0;
    if (i === 0) return 1;
    if (i === 1) return 1;

    // recurrence relation
    const oneDigit = s.slice(i - 1, i);
    const twoDigit = s.slice(i - 2, i);

    let res = 0;
    if (oneDigit !== 0) res += dp(i - 1);
    if (twoDigit <= 26) res += dp(i - 2);

    return res;
  }
  return dp(n);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + memoization
var numDecodings = function (s) {
  const n = s.length;
  // edge case
  if (s[0] === "0") return 0;
  const memo = {};

  function dp(i) {
    // check cache
    if (i in memo) return memo[i];

    // base cases
    if (s[i] === "0") return 0;
    if (i === 0) return 1;
    if (i === 1) return 1;

    // recurrence relation
    const oneDigit = s.slice(i - 1, i);
    const twoDigit = s.slice(i - 2, i);

    let res = 0;
    if (oneDigit !== 0) res += dp(i - 1);
    if (twoDigit <= 26) res += dp(i - 2);

    return (memo[i] = res);
  }
  return dp(n);
};

// Time: O(n)
// Space: O(n)

// Tabulation
var numDecodings = function (s) {
  const n = s.length;

  if (s[0] === "0") return 0;

  const dp = new Array(n + 1).fill(0);

  dp[0] = dp[1] = 1;

  for (let i = 2; i < n + 1; i++) {
    const oneDigit = s.slice(i - 1, i);
    const twoDigit = s.slice(i - 2, i);

    if (oneDigit !== 0) dp[i] += dp[i - 1];
    if (twoDigit >= 10 && twoDigit <= 26) dp[i] += dp[i - 2];
  }
  return dp[n];
};

// Time: O(n)
// Space: O(n)

// Tabulation - optimized
var numDecodings = function (s) {
  const n = s.length;

  if (s[0] === "0") return 0;

  let one = 1,
    two = 1;

  for (let i = 2; i < n + 1; i++) {
    const oneDigit = s.slice(i - 1, i);
    const twoDigit = s.slice(i - 2, i);

    let curr = 0;
    if (oneDigit > 0) curr += one;
    if (twoDigit >= 10 && twoDigit <= 26) curr += two;

    two = one;
    one = curr;
  }
  return one;
};

// Time: O(n)
// Space: O(1)

/////////////////////////////////////////////////////////////////////////////////////////////
// Recursion in reverse order
// Recursion
var numDecodings = function (s) {
  function dp(i) {
    // if string begins with a "0", return 0
    if (s[i] === "0") return 0;

    // if we are at the last digit, return 1
    if (i === s.length) return 1;
    // if we are at the second last digit, return 1
    if (i === s.length - 1) return 1;

    // process one digit
    let res = dp(i + 1);
    // if two digit is in range, then we process it
    if (Number(s.slice(i, i + 2)) <= 26) {
      res += dp(i + 2);
    }
    return res;
  }
  return dp(0);
};

// Time: O(2^n)
// Space: O(n)

// Recursion + memoization
var numDecodings = function (s) {
  const memo = {};

  function dp(i) {
    // check cache
    if (i in memo) return memo[i];

    // if string begins with a "0", return 0
    if (s[i] === "0") return 0;

    // if we are at the last digit, return 1
    if (i === s.length) return 1;
    // if we are at the second last digit, return 1
    if (i === s.length - 1) return 1;

    // process one digit
    let res = dp(i + 1);
    // if two digit is in range, then we process it
    if (Number(s.slice(i, i + 2)) <= 26) {
      res += dp(i + 2);
    }
    return (memo[i] = res);
  }
  return dp(0);
};

// Time: O(n)
// Space: O(n)
