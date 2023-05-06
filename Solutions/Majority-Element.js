/**
 * @param {number[]} nums
 * @return {number}
 */
// Max heap
var majorityElement = function (nums) {
  const map = new Map();
  for (let num of nums) map.set(num, map.get(num) + 1 || 1);
  const maxHeap = new MaxPriorityQueue();
  for (let [key, val] of map) maxHeap.enqueue(key, val);
  return maxHeap.dequeue().element;
};
// TC: O(nlogn)
// SC: O(n)

// Hash map
var majorityElement = function (nums) {
  const map = {};
  let maxEl = nums[0],
    count = 0;
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    let c = map[num] + 1 || 1;
    if (c > count) {
      maxEl = num;
      count = c;
    }
    map[num] = c;
  }
  return maxEl;
};
// TC: O(n)
// SC: O(n)

// Boyer-Moore
var majorityElement = function (nums) {
  let count = 1,
    curr = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === curr) count++;
    else {
      if (count === 0) {
        curr = nums[i];
        count++;
      } else count--;
    }
  }
  return curr;
};
// TC: O(n)
// SC: O(1)
