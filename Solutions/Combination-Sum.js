/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const res = [];

  // i tracks which candidates we are allowed to use
  function dfs(i, curr, total) {
    // base cases
    if (total === target) {
      // push copy of curr so can keep using
      res.push(curr.slice());
      return;
    }
    if (i >= candidates.length || total > target) {
      return;
    }

    // decision to include candidate
    curr.push(candidates[i]);
    dfs(i, curr, total + candidates[i]);

    // decision to exclude candidate
    curr.pop();
    dfs(i + 1, curr, total);
  }

  dfs(0, [], 0);
  return res;
};

// Time: O(k * 2^t)
// Space: O(n)

/**
At each element, we must decide whether to pick or not pick, and how many times to pick, because elements can be picked as many times as needed
If we decide to pick an element, we will leave the index pointer in place, in case we want to pick it again
If we decide not to pick and element, then we will increment the pointer so that the skipped element can never be picked again in this path

Backtrack function
Parameters:
i index to choose from next
curr is the current selection of elements in this path
total is the current sum of all elements in the path

Base cases:
If the total equals the target, then we have found a suitable combination
If i moves past the length of the candidates array OR total exceeds the target, then we can return immediately

Recursive cases:
We choose to pick the element
We push the element at index i onto curr
Then we recursively call backtrack function - we leave i the same in case we want to pick the same element again in the next step

We choose not to pick the element
We pop the element from curr (backtracking)
Then we recursively call backtrack function - we increment i so that we can pick the next element in the array

COMPLEXITY ANALYSIS DOES NOT MAKE SENSE
TC: O(k * 2^t) if you can only pick each element once, then there will 2^n combinations. Here is it 2^t where t is the total, because assume
  candidates are [1] and total is 10. We can either pick or not pick until we reach 10 (pick 10 1s). k is the average length of the combination
SC: O(k * x) where k is average length, and x is number of combinations (hypothetical)
 */
