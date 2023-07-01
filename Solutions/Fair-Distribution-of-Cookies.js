/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function (cookies, k) {
  const n = cookies.length;
  let res = Infinity;
  const arr = new Array(k).fill(0);

  function dp(i) {
    if (i === n) {
      let max = -Infinity;
      for (let batch of arr) max = Math.max(max, batch);
      res = Math.min(res, max);
      return;
    }

    for (let j = 0; j < k; j++) {
      arr[j] += cookies[i];
      dp(i + 1);
      arr[j] -= cookies[i];
    }
  }

  dp(0);
  return res;
};
// TC: O(n)
// SC: O(n)
