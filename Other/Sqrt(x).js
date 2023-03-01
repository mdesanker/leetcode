/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x <= 1) return x;

  function isValid(num) {
    return num * num <= x;
  }

  let l = 0,
    r = x;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    if (isValid(mid)) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l - 1;
};

/**
We need to find maximal k satisfying k^2 <= x
Usually search for minimal x satisfying condition(k)
Maximal k satisfying `condition(k) is false` is equal to the minimal k satisfying `condition(k) is true` minus one
*/

// Time: O(logn)
// Space: O(1)

// With res variable
var mySqrt = function (x) {
  function isValid(num) {
    return num * num <= x;
  }

  let l = 0,
    r = x;
  let res = l;
  while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);

    if (isValid(mid)) {
      res = Math.max(res, mid);
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return res;
};
