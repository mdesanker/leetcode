/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  // edge case
  if (numRows === 1) return s;
  // every index will correspond to different row
  const res = new Array(numRows).fill("");

  // increment back and forth through indices adding chars
  let backward = true;
  let index = 0;
  for (let char of s) {
    res[index] += char;
    if (index === 0 || index === numRows - 1) {
      backward = !backward;
    }
    if (backward) index--;
    else index++;
  }
  return res.join("");
};

// Time: O(n) iterate through s once
// Space: O(n) res array will hold every char in s
