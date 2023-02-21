/**
 * @param {number[]} nums
 * @return {number}
 */
// Binary Search
var singleNonDuplicate = function (nums) {
  //  the side with the single num will have an odd length, so we can use binary search
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);
    let halvesEven = (r - mid) % 2 === 0;

    // 4 cases:
    if (nums[mid] === nums[mid + 1]) {
      // 1. mid's partner is to the right, and the halves are originally even - right side becomes odd when we remove mid's partner, so search right
      // 2. mid's partner is to the right, adn the halves are  originally odd - right side becomes even when we remove mid's partner, so search left
      if (halvesEven) {
        l = mid + 2;
      } else {
        r = mid - 1;
      }
      // 1. mid's partner is to the left, and the halves are originally even - left side becomes odd when we remove mid's partner, so search left
      // 2. mid's partner is to the left, adn the halves are  originally odd - left side becomes even when we remove mid's partner, so search right
    } else if (nums[mid] === nums[mid - 1]) {
      if (halvesEven) {
        r = mid - 2;
      } else {
        l = mid + 1;
      }
    } else return nums[mid];
  }
  return nums[l];
};

// Time: O(logn)
// Space: O(1)

// Single pass [Not valid]
var singleNonDuplicate = function (nums) {
  let res = 0;
  for (let num of nums) {
    res ^= num;
  }
  return res;
};

// Time: O(n)
// Space: O(1)
