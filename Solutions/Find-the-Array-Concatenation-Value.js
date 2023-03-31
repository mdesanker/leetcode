/**
 * @param {number[]} nums
 * @return {number}
 */
var findTheArrayConcVal = function (nums) {
  let res = 0;
  let l = 0,
    r = nums.length - 1;
  while (l <= r) {
    let num =
      l === r ? nums[l].toString() : nums[l].toString() + nums[r].toString();
    res += Number(num);
    l++;
    r--;
  }
  return res;
};

// Time: O(n) iterate through nums once
// Space: O(1) constant memory to store pointers
