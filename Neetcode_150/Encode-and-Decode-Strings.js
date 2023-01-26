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

/**
Encode:
Return a string, so initialize res as an empty string.
Iterate through every str and push the length, a spacer, and the str on to the res string.

Decode:
Initialize a pointer at the start of the string (i = 0). Then while loop until i reaches the end of the string.
Need to find the length of the next substring to extract. The characters up until the spacer are the length of the next string.
Initialize a second pointer (j) starting at i, then increment j until you reach the spacer.
Get the length by slicing from i to j (index of the spacer) and converting to a number.
Pointer j is now at the index right before the start of the next string. 
Slice the length of the string starting from j + 1 -> s.slice(j + 1, j + 1 + length) and pust to result array
Move pointer i to j + 1 + length so that we can check for the next str group

Encode:
TC: O(n) iterate through strs array once
SC: O(n) build a string that scales linearly with length of strs array

Decode: 
TC: O(n) iterate through string once
SC: O(n) build a result array that scales linearly with string length
 */
