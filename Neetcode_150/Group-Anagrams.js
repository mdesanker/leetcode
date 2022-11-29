/**
 * @param {string[]} strs
 * @return {string[][]}
 */

const groupAnagrams = function (strs) {
  const res = {};

  for (let str of strs) {
    // create array to count frequency of each letter in str
    const count = new Array(26).fill(0);

    for (let char of str) {
      // get char code for each letter and subtract 97 (char code for "a")
      count[char.charCodeAt() - 97]++;
    }
    // convert count array to str to use as key
    const key = count.join("#");

    res[key] ? res[key].push(str) : (res[key] = [str]);
  }
  return Object.values(res);
};

/*
Time: O(N * K) where N is size of input array and K is max length pf string in input array
Space: O(N)
*/
