/**
 * @param {string[]} words
 * @param {number[][]} queries
 * @return {number[]}
 */
var vowelStrings = function (words, queries) {
  const res = [];
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  const isValid = [];
  for (let word of words) {
    let firstLetter = word[0];
    let lastLetter = word[word.length - 1];

    vowels.has(firstLetter) && vowels.has(lastLetter)
      ? isValid.push(1)
      : isValid.push(0);
  }

  for (let [l, r] of queries) {
    let count = 0;
    for (let i = l; i <= r; i++) {
      count += isValid[i];
    }
    res.push(count);
  }
  return res;
};

// Prefix (running) sum
var vowelStrings = function (words, queries) {
  // build a set with vowels for O(1) lookup
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  // we will store the sum of freq of all valid strings up to each index in isValid
  // seed isValid with 0 to avoid edge case
  const isValid = [0];
  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    const last = isValid[i];

    let firstLetter = word[0];
    let lastLetter = word[word.length - 1];

    const counts = vowels.has(firstLetter) && vowels.has(lastLetter);

    // add 1 to previous value if this string "counts", otherwise add 0
    isValid.push(last + (counts ? 1 : 0));
  }

  const res = [];

  // to calculate the value for each range of indices, we can subtract left from right + 1
  for (const [l, r] of queries) {
    res.push(isValid[r + 1] - isValid[l]);
  }
  return res;
};

// Time: O(n) we iterate through words array once, checking first and last character of every string should be O(1) because of indexing,
//    then we iterate through queries array once
// Space: O(n) extra memory needed to build isValid array, which will contain a value for every word
