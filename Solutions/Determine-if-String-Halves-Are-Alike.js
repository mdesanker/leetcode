/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function (s) {
  const vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];

  let count = 0;

  // count vowels in first half
  for (let i = 0; i < s.length / 2; i++) {
    if (vowels.includes(s[i])) count++;
  }

  // count vowels in second half
  for (let j = s.length / 2; j < s.length; j++) {
    if (vowels.includes(s[j])) count--;
  }

  return count === 0;
};

// Time: O(N)
// Space: O(1)
