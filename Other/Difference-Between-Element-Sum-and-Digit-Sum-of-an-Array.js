/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function (nums) {
  let elementSum = 0;
  let digitSum = 0;

  function sumDigits(num) {
    let res = 0;
    while (num > 0) {
      let digit = num % 10;
      res += digit;
      num = Math.floor(num / 10);
    }
    return res;
  }

  for (let num of nums) {
    elementSum += num;
    digitSum += sumDigits(num);
  }

  return Math.abs(elementSum - digitSum);
};

// Time: O(n)
// Space: O(1)
