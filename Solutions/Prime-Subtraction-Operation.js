/**
 * @param {number[]} nums
 * @return {boolean}
 */

/**
Key Insight
Sieve of Eratosthenes to generate primes up to 1000
Greedily try to reduce the current number as much as possible
    Search for largest prime number smaller than nums[i], and subtract from nums[i]
 */

var primeSubOperation = function (nums) {
  function getPrimes(n) {
    let prime = new Array(n + 1).fill(true);
    for (let i = 2; i < Math.sqrt(n); i++) {
      if (prime[i]) {
        for (let j = 2 * i; j < n + 1; j += i) {
          prime[j] = false;
        }
      }
    }

    const res = [];
    for (let i = 2; i < n + 1; i++) {
      if (prime[i]) res.push(i);
    }
    return res;
  }

  const primes = getPrimes(1000);
  const n = nums.length;
  let needSub = false;

  for (let i = n - 2; i >= 0; i--) {
    // if num already smaller, continue
    if (nums[i] < nums[i + 1]) continue;

    needSub = true;
    for (let p of primes) {
      // once we reach primes larger than nums[i] we can stop
      if (nums[i] <= p) break;

      // if subtracting this prime from nums[i] will make it smaller than following num
      if (nums[i] - p < nums[i + 1]) {
        nums[i] -= p;
        // no longer need to substitute this num
        needSub = false;
        break;
      }
    }
    // if couldn't find a prime to subtract and meet condition, return false
    if (needSub) return false;
  }
  return true;
};
// Time: O(n * 1000)
// Space: O(1000)
