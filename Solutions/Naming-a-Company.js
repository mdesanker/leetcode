/**
 * @param {string[]} ideas
 * @return {number}
 */
var distinctNames = function (ideas) {
  // create an array with empty set for every letter in alphabet
  // must use map to create a unique set in each index
  // otherwise it maps each index to the same set
  const initialGroups = new Array(26).fill(0).map((s) => new Set());
  for (let idea of ideas) {
    // add each suffix to each initial
    const pos = idea[0].charCodeAt() - "a".charCodeAt();
    initialGroups[pos].add(idea.slice(1));
  }

  let res = 0;
  // compare every pair of suffixes
  for (let i = 0; i < 25; i++) {
    for (let j = i + 1; j < 26; j++) {
      let count = 0;
      // count the suffixes shared by both sets
      for (let suffix of initialGroups[i]) {
        count += initialGroups[j].has(suffix) ? 1 : 0;
      }
      // 2 * unique in A * unique B
      res +=
        2 * (initialGroups[i].size - count) * (initialGroups[j].size - count);
    }
  }
  return res;
};

// Time: O(n * m)
//  Group words by their initials, takes O(m) to hash string of length m, and this is done n times
//  Need to try every pair of initials: 25 * 26 / 2 = 325 pairs
//  Total complexity is O(325 * n * m) which reduces to O(n * m)
// Space: O(n * m) we store n suffixes of length m in sets
