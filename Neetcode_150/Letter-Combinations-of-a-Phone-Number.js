/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const res = [];
  const digitToChar = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  // i = digit at in input string
  function backtrack(i, curr) {
    // base case: curr string has a letter for every digit
    if (curr.length === digits.length) {
      res.push(curr);
      return;
    }

    // brute force backtrack for every possible char for digits[i]
    for (const char of digitToChar[digits[i]]) {
      // increment index and add current char to current string
      backtrack(i + 1, curr + char);
    }
  }
  // check digits isn't empty so don't add empty strings to array
  if (digits.length) {
    backtrack(0, "");
  }
  return res;
};

// Time: O(n * 4^n)
// Space: O()
