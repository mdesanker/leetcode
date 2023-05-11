/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function (functions) {
  return function (x) {
    let res = x;
    for (let i = functions.length - 1; i >= 0; i--) {
      res = functions[i](res);
    }
    return res;
  };
};
// TC: O(n)
// SC: O(n)

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
