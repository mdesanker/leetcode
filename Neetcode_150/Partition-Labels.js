/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  // hashmap char: lastIndex
  const charMap = {};
  for (let i = 0; i < s.length; i++) charMap[s[i]] = i;

  const res = [];

  let size = 0,
    end = 0;
  for (let i = 0; i < s.length; i++) {
    // increment size counter
    size++;
    // set end to max of last occurance of char
    end = Math.max(end, charMap[s[i]]);

    // once current index at last occurance, push size to res then reset size
    if (i === end) {
      res.push(size);
      size = 0;
    }
  }
  return res;
};

// Time: O(n)
// Space: O(1)
