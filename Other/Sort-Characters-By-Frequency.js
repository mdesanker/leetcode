const frequencySort = function (s) {
  const charMap = new Map();
  const bucket = [];

  // map chars of s and their frequencies
  for (let char of s) {
    charMap.set(char, charMap.get(char) + 1 || 1);
  }

  // map chars to array of sets corresponding to frequency
  for (let [char, freq] of charMap) {
    bucket[freq] = (bucket[freq] || new Set()).add(char);
  }

  let res = "";

  // iterate through bucket in-reverse to order chars in decreasing frequency
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) {
      for (let char of bucket[i]) {
        res += char.repeat(i);
      }
    }
  }

  return res;
};

// Time: O(N)
// Space: O(N)
