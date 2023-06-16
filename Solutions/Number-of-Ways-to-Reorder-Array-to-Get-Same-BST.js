/**
 * @param {number[]} nums
 * @return {number}
 */
const ll = BigInt;
const combination = (m, n) => {
  return factorial(m, n) / factorial(n, n);
};
const factorial = (m, n) => {
  let num = 1n;
  let cnt = 0;
  for (let i = ll(m); i > 0; i--) {
    if (cnt == n) break;
    num *= i;
    cnt++;
  }
  return num;
};

const mod = ll(1e9 + 7);
const numOfWays = (nums) => {
  return (dfs(nums) - 1n) % mod;
};

const dfs = (a) => {
  if (a.length <= 2) return 1n;
  let left = [],
    right = [];
  for (const x of a) if (x < a[0]) left.push(x);
  for (const x of a) if (x > a[0]) right.push(x);
  let ln = left.length,
    rn = right.length;
  return combination(ln + rn, rn) * dfs(left) * dfs(right);
};
// TC: O(m^2)
// SC: O(m)
