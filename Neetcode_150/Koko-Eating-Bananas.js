/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // worst possible answer is the largest pile in piles
  let left = 1,
    right = Math.max(...piles);

  // set res to upper limit
  let res = right;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    let hours = 0;
    for (let p of piles) {
      hours += Math.ceil(p / mid);
    }

    if (hours <= h) {
      res = Math.min(res, mid);
      right = mid - 1; // try to find smaller answer
    } else {
      left = mid + 1; // try to find larger answer
    }
  }
  return res;
};

// Time: O(log(maxP)) where P is largest pile in piles
// Space: O(1)

/** 
Need to find the minimum number of bananas koko can eat per hour to finish within h hours. Could think of the time we need to return
as a sorted array, so can use binary search.

Initialize l pointer to 1 (can do 0, but eating 0 bananas per hour is not a valid answer)
Initialize r pointer to max of piles array - this is the worst case scenario. If koko can eat the largest pile in one hour
and length of piles array is less than h, then this is a valid upper bound

Use binary search to select bananas/hr (mid)
Check how many hours it would take to eat all bananas at this rate.
Initialize ah hour counter to zero
Iterate through every pile and calculate how many hours at this rate and add to counter - use ceiling division because koko cannot move to
next pile if he finishes a pile early

If the hours it takes to eat the bananas is less than or equal to h, then we have a valid answer
Update res to the minimum of itself and mid
Then set r pointer to mid - 1 to see if we can find a smaller value that works

If hours > h, then koko is not eating enough bananas per hour to meet the requirement, move l pointer to mid + 1

Return res

TC: O(log(maxP)) We are searching the range from 1 to size of max pile, so that is effectively the size of the array we are searching over
SC: O(1) constant space to store pointers
*/
