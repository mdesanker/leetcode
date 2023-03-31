/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */

// One array
var findJudge = function (n, trust) {
  // there must be at least enough trust for n - 1 nodes to trust the judge
  if (trust.length < n - 1) return -1;

  // use 1 array to map who is giving and receiving trust
  const trustArr = new Array(n + 1).fill(0);

  for (let [a, b] of trust) {
    trustArr[b]++;
    trustArr[a]--;
  }

  // for each person, check if they have n - 1 people trusting them and that they do not trust anyone themselves
  for (let i = 1; i < n + 1; i++) {
    if (trustArr[i] === n - 1) {
      return i;
    }
  }
  return -1;
};

// Time: O(e) wwhere is the number of edges (trust relationships) which will be bigger than n (the number of people)
// Space: O(n)

// Two arrays
var findJudge = function (n, trust) {
  // there must be at least enough trust for n - 1 nodes to trust the judge
  if (trust.length < n - 1) return -1;

  // use 2 arrays to map who is giving and receiving trust
  const indegree = new Array(n + 1).fill(0);
  const outdegree = new Array(n + 1).fill(0);

  for (let [a, b] in trust) {
    indegree[b]++;
    outdegree[a]++;
  }

  // for each person, check if they have n - 1 people trusting them and that they do not trust anyone themselves
  for (let i = 1; i < n + 1; i++) {
    if (indegree[i] === n - 1 && outdegree[i] === 0) {
      return i;
    }
  }
  return -1;
};
