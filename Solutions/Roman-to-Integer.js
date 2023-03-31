/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  // iterate backwards through string s
  // if current value is smaller than previous value, then we subtract current value
  // else we add current value
  let res = map[s[s.length - 1]];
  for (let i = s.length - 2; i >= 0; i--) {
    if (map[s[i]] < map[s[i + 1]]) {
      res -= map[s[i]];
    } else {
      res += map[s[i]];
    }
  }
  return res;
};

// Time: O(1) we iterate through the string once, O(n), but because roman numerals are bounded between 1 and 3999, there is a finite number of numerals we will have to iterate through
// Space: O(1) no additional memory is needed because only variables are used
