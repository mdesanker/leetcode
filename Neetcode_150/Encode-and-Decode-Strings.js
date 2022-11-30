/**
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs) {
  let res = "";

  for (let str of strs) {
    // use length of string, followed by delimiter (#), followed by str
    res += str.length.toString() + "#" + str;
  }

  return res;
}

/**
 * @param {string} str
 * @return {string[]}
 */
function decode(str) {
  const res = [];
  let i = 0;

  while (i < str.length) {
    // find the number corresponding of length of the next word
    let j = i;
    while (str[j] !== "#") {
      j++;
    }

    const length = Number(str.substring(i, j));

    // use length to extract next string and add to result array
    res.push(str.substring(j + 1, j + 1 + length));

    // move index to start of next word
    i = j + 1 + length;
  }

  return res;
}

// Time: O(N) where n is the number of characters in the strs array
// Space: O(N)
