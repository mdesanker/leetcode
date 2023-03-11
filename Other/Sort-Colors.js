/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// Quick sort
var sortColors = function (nums) {
  function quickSort(nums, l, r) {
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

// Time: Avg O(n), Worst O(n^2)
// Space: O(logn)
