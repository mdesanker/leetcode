/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  function partition(left, right) {
    // pivot - num to find the correct index for
    // i - marker for end of lower portion
    let pivot = nums[right],
      i = left;

    // j - scans through partition
    for (let j = left; j < right; j++) {
      // if nums[j] less than pivot, swap into lower portion and increment i
      if (nums[j] <= pivot) {
        [nums[j], nums[i]] = [nums[i], nums[j]];
        i++;
      }
    }

    // swap pivot into position right after lower portion
    [nums[i], nums[right]] = [nums[right], nums[i]];

    // return correct index of pivot
    return i;
  }

  // kth largest element is length - k in array
  k = nums.length - k;
  let left = 0,
    right = nums.length - 1;

  while (left < right) {
    // returns index of pivot
    let pivot = partition(left, right);

    // shift window or return the kth largest num
    if (pivot < k) {
      left = pivot + 1;
    } else if (pivot > k) {
      right = pivot - 1;
    } else {
      break;
    }
  }

  return nums[k];
};

// Time: O(n) on average, O(n**2) worst case scenario
// Space: O(1) sort array in place
