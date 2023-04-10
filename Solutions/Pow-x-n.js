/**
Solution: Fast Power Algorithm
 */
// Brute force
var myPow = function (x, n) {
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }

  let res = 1;
  for (let i = 0; i < n; i++) {
    res *= x;
  }
  return res;
};
// TC: O(n)
// SC: O(1)

// Fast Power Algorithm (Recursive)
var myPow = function (x, n) {
  function helper(x, n) {
    if (n === 0) return 1;
    if (x === 0) return 0;

    const half = helper(x, Math.floor(n / 2));
    if (n % 2 === 0) {
      return half * half;
    } else {
      return half * half * x;
    }
  }

  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  return helper(x, n);
};
// TC: O(logn)
// SC: O(1)
