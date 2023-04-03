/**
Solution: Follow rules

1. Trim whitespace
2. Check sign
3. Build number
4. Check limits
 */
var myAtoi = function (s) {
  const MAX = 2 ** 31 - 1,
    MIN = -(2 ** 31);

  // trim whitespace
  let sTrim = s.trim();
  let start = 0,
    n = sTrim.length;

  // check whether number is neg or pos
  let sign = 1;
  if (sTrim[start] === "-" || sTrim[start] === "+")
    sign = sTrim[start++] === "-" ? -1 : 1;

  // build number
  let res = 0;
  for (let i = start; i < n; i++) {
    if (sTrim[i].match(/[0-9]/i)) {
      res = res * 10 + Number(sTrim[i]);
    } else break;
  }
  res *= sign;

  // check limits
  if (res <= MIN) return MIN;
  else if (res >= MAX) return MAX;
  else return res;
};
// TC: O(n)
// SC: O(n)
