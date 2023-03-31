/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let l = 1,
      r = n;
    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);
      if (isBadVersion(mid)) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
};

// Time: O(logn)
// Space: O(1)

var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let l = 1,
      r = n;
    while (l < r) {
      let mid = l + Math.floor((r - l) / 2);

      if (isBadVersion(mid)) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return l;
  };
};

// Time: O(logn)
// Space: O(1)

var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let l = 1,
      r = n;
    let res = r;

    while (l <= r) {
      let mid = l + Math.floor((r - l) / 2);

      if (isBadVersion(mid)) {
        res = Math.min(res, mid);
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }
    return res;
  };
};
