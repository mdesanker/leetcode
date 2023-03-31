/**
 * @param {string} source
 * @param {string} target
 * @return {number}
 */
// Two pointer
var shortestWay = function (source, target) {
  let l = 0,
    r = 0;
  let res = 0;
  while (r < target.length) {
    let index = source.indexOf(target[r], l);
    if (index === -1) {
      if (l === 0) return -1;
      res++;
      l = 0;
    } else {
      r++;
      l = index + 1;
    }
  }
  return res + 1;
};

// Time: O(s * t) length of source and target respectively
// Space: O(1)
