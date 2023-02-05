/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  if (p.length > s.length) return [];

  const neededChars = {};
  for (let char of p) neededChars[char] = neededChars[char] + 1 || 1;

  const res = [];

  let l = 0,
    r = 0,
    neededLength = p.length;

  while (r < s.length) {
    const rightChar = s[r];
    if (neededChars[rightChar] > 0) neededLength--;
    neededChars[rightChar]--;
    r++;

    if (neededLength === 0) res.push(l);

    if (r - l + 1 > p.length) {
      const leftChar = s[l];
      if (neededChars[leftChar] >= 0) neededLength++;
      neededChars[leftChar]++;
      l++;
    }
  }
  return res;
};

// Time: O(n) iterate through s once
// Space: O(n) extra memory needed to build neededChars hash, could potentially hold every element in s

// This question is an analogous to "Permutation in String"
