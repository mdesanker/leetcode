/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let count = 0,
    currSum = 0;
  const map = new Map(); // key: sum, val: number of occurrences
  // one way to sum to 0 at beginning
  map.set(0, 1);

  for (let num of nums) {
    // add num to currSum
    currSum += num;

    // if currSum - k exists in map, have found valid subarray
    if (map.has(currSum - k)) count += map.get(currSum - k);

    // add currSum to map
    map.set(currSum, map.get(currSum) + 1 || 1);
  }
  return count;
};

// Time: O(n)
// Space: O(n)

var subarraySum = function (nums, k) {
  let count = 0,
    currSum = 0;
  // map will track the currSums along the array and their freq of occurence
  const map = new Map();

  for (let num of nums) {
    // add num to currSum
    currSum += num;

    // situation 1
    // continuous subarray starts at index 0
    if (currSum === k) count++;

    // situation 2
    // number of times the currSum - k has occcurred already
    // determines the number of times a subarray with sum k
    // has occurred up to the current index
    count += map.get(currSum - k) || 0;

    // add currSum to map
    map.set(currSum, map.get(currSum) + 1 || 1);
  }
  return count;
};

// Time: O(n)
// Space: O(n)

/**
Use prefix sum technique for problems like "find a number of continuous subarrays/submatrices/tree paths that sum to target"

Initialize counter and currSum variables to 0
Initialize a map that will track currSums and their freq of occurence

For each num in nums array
Add num to currSum

For prefix sum technique, there are two situations to consider
1. path with targetSum starts at beginnning of array
2. path with targetSum starts somewhere in the middle of the array

1. path with targetSum starts at beginnning of array
If this is the case, currSum will equal target sum, k. If this happens, increment counter

if (currSum === k) count++;

2. path with targetSum starts somewhere in the middle of the array
To check for this, we will add the freq of occurence of the prefix sum to the counter
If the prefix sum exists in the map, it means we have a subarray not starting at index 0, that equals the target sum

count += map.get(currSum - k) || 0;

Important to use `|| 0;` because if key does not exist in map, then first part will return null

Then we add the currSum to the map before ending this iteration of the loop

TC: O(n) we iterate through every num in the nums array once
SC: O(n) we will have to store a currSum for every num in the map
 */
