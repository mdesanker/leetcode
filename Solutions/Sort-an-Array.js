/**
 * @param {number[]} nums
 * @return {number[]}
 */
// Min heap
var sortArray = function (nums) {
  const minHeap = new MinPriorityQueue();

  for (let num of nums) minHeap.enqueue(num);

  const res = [];
  while (minHeap.size()) {
    res.push(minHeap.dequeue().element);
  }
  return res;
};

// Time: O(nlogn) each heap enqueue is logn, and every element is pushed into heap
// Space: O(n)

// Quick sort - max pivot [TLE]
// This one has O(n^2) time complexity in worst case because pivot is always chosen as max element in array
var sortArray = function (nums) {
  function quickSelect(l, r) {
    if (l >= r) return nums;

    let pivot = nums[r],
      i = l;
    for (let j = l; j < r; j++) {
      if (nums[j] <= pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }
    [nums[i], nums[r]] = [nums[r], nums[i]];

    quickSelect(l, i - 1);
    quickSelect(i + 1, r);
    return nums;
  }
  return quickSelect(0, nums.length - 1);
};
// TC: O(n) average, O(n^2) worst case
// SC: O(logn)

// Quick sort - random pivot
// Randomized pivot avoids worst case time complexity, which can occur if pivot is consistently chosen as teh smallest or largest element in the array
var sortArray = function (nums) {
  const n = nums.length;
  if (n <= 1) return nums;

  const pivot = nums[Math.floor(Math.random() * n)];
  const less = [],
    equal = [],
    greater = [];

  for (let num of nums) {
    if (num < pivot) less.push(num);
    else if (num === pivot) equal.push(num);
    else greater.push(num);
  }

  return sortArray(less).concat(equal, sortArray(greater));
};
// TC: O(n), O(n^2) worst case
// SC: O(n)
