/**
 * @param {number[]} tasks
 * @return {number}
 */
var minimumRounds = function (tasks) {
  const taskMap = {};
  for (let task of tasks) taskMap[task] = (taskMap[task] || 0) + 1;

  let res = 0;
  for (let count of Object.values(taskMap)) {
    // can't handle single tasks
    if (count < 2) return -1;
    // If count % 3 = 0; (count / 3) groups of triplets
    // If count % 3 = 1; (count / 3 - 1) groups of triplets and 2 pairs.
    // If count % 3 = 2; (count / 3) groups of triplets and 1 pair.
    res += Math.ceil(count / 3);
  }
  return res;
};

// Time: O(n)
// Space: O(n)
