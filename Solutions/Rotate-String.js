/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  if (s.length !== goal.length) return false;
  let s1 = s + s;
  return s1.indexOf(goal) !== -1;
};

// Time: O(n)
// Space: O(n)
