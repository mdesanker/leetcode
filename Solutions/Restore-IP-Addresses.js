/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  // can't form valid IP address with > 12 or < 4 digits
  if (s.length > 12 || s.length < 4) return [];

  const res = [];

  // backtrack cutting down string as we go along
  function backtrack(s, curr) {
    // base case
    // 4 digits and no remaining digits in s
    if (curr.length === 4 && !s.length) {
      res.push(curr.slice().join("."));
      return;
    }

    // can add between 1 and 3 digits at a time
    for (let i = 1; i < 4; i++) {
      // if not enough remaining in s
      if (s.length < i) continue;
      // slice the next str candidate
      const str = s.slice(0, i);
      // check that str does not begin with 0 and is not greater than 255
      if ((str.length > 1 && str[0] === "0") || Number(str) > 255) continue;
      // backtracking
      curr.push(str);
      backtrack(s.slice(i), curr);
      curr.pop();
    }
  }

  backtrack(s, []);
  return res;
};

// n is number of integers (4)
// m is max number of digits per integer (3)

// Time: O(m^n * n) --> simplifies to O(1) because n = 4 and m = 3
// Space: O(m * n) --> simplifies to O(1)
