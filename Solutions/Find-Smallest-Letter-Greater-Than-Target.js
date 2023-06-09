/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
// Brute Force
var nextGreatestLetter = function (letters, target) {
  for (const letter of letters) {
    if (letter > target) return letter;
  }
  return letters[0];
};
// TC: O(n)
// SC: O(1)

// Binary Search
var nextGreatestLetter = function (letters, target) {
  if (letters[letters.length - 1] <= target) return letters[0];

  let l = 0,
    r = letters.length - 1;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);

    if (letters[mid] > target) {
      r = mid;
    } else {
      l = mid + 1;
    }
  }
  return letters[l];
};

// Time: O(logn)
// Space: O(1)
