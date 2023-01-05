/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
  let leftMin = 0,
    leftMax = 0;

  for (let char of s) {
    if (char === "(") {
      leftMin++;
      leftMax++;
    } else if (char === ")") {
      leftMin--;
      leftMax--;
    } else {
      // wildcard is closing parens
      leftMin--;
      // wildcard is opening parens
      leftMax++;
    }
    // if maximum number of left parens is negative, string is invalid
    if (leftMax < 0) return false;
    // leftMin gets reset if negative
    if (leftMin < 0) {
      // s = ( * ) ()
      leftMin = 0;
    }
  }
  return leftMin === 0;
};

// Time: O(n)
// Space: O()

/**
Brute Force - DFS
Time: O(3^n) because 3 branches, n is height (lenght of string)

Memoization - DP
Cache i (index) and left (number of open parens)
Time: O(n^3)
Space: O(n^2) 2D matrix
*/
