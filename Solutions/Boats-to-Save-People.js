/**
Solution: Two Pointer

1. Sort peoples array in decreasing order
2. Two pointers
  - Initialize l and r pointer to beginning and end of peoples array, intialize counter variable
  - If sum of l and r elements is less than limit, move r pointer inward
  - Move l pointer forward and increment count

n = peoples.length
TC: O(nlogn) built-in sort
SC: O(logn) built-in sort
 */
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => b - a);

  let l = 0,
    r = people.length - 1;
  let count = 0;
  while (l <= r) {
    if (people[l] + people[r] <= limit) r--;
    l++;
    count++;
  }
  return count;
};
// TC: O(nlogn) built-in sort
// SC: O(logn) built-in sort
