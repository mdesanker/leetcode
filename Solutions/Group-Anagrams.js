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

//Time: O(n * k) where N is size of input array and K is max length pf string in input array
// Space: O(n * k)

/**
Optimal solution
A hashmap will be used to store keys which encode the count of each letter in the 
strings and the value will be an array of the corresponding strs.

Loop through every string. 
Initialize a new count array of 26 0s which will be used to build the key for each anagram.
For each char in the current str, use char.charCodeAt() - 'a'.charCodeAt() to get the 
corresponding index in the count array and increment it by 1 for each char.

JavaScript does not allow arrays to be used as hashmap keys, so the count array needs to be converted into a string using .join() to be used as a key. 
Use a spacer between every element so that two digit char counts do not cause problems:
Simple example: [12, 3, 0] -> '1230' vs [1, 23, 0] -> '1230'
A spacer prevents this confusion: [12, 3, 0] -> '12#3#0' vs [1, 23, 0] -> '1#23#0'

If this key is already present in hashmap, then push the current string onto the 
existing array of value, else set the key equal to an array with the current str.

Return the array of values of hashmap, which will return all the anagrams grouped into indivudal arrays

TC: O(n * k) iterate through strs array once (n) and for each str in strs, you iterate through every character in the string (k - length of longest str)
SC: O(n * k) for information that is stored in hashmap
 */
