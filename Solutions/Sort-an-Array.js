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

// Quick sort [TLE]
var sortArray = function (nums) {
  function quickSort(nums, l, r) {
    // base case
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

    quickSort(nums, l, i - 1);
    quickSort(nums, i + 1, r);
    return nums;
  }
  return quickSort(nums, 0, nums.length - 1);
};

// Time: O(n) average, O(n^2) worst case
// Space: O(logn)
