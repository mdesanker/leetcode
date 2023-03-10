# DP on Subsequences/Subsets

Subsequences are contiguous or non-contiguous arrays with elements that follow the order of the parent array
Subets contain elements of the parent array, but are not necessarily in the same order

Problems typically ask if there are any subsequences/subsets that meet a certain target

- Brute force would be to use backtracking/recursion to generate all possibilities and check if meet target, but we don't need to generate all possiblities

## Framework

1. Express current problem in terms of index. For an array problem, this is the index of the current element

f(n - 1, target) in the entire array to index n - 1, does there exist a target - goal of the recurrence

2. Explore possibilites of that index. The element at that index can either be included, or not included

3. Return T/F

### Recursion

```js
f(ind, target) {
  // base cases
  if (target === 0) return true;
  if (ind === 0) return arr[0] === target;

  // not take
  let notTake = f(ind - 1, target);

  // take
  let take = false;
  if (target > arr[ind]) {
    f(ind - 1, target - arr[ind]);
  }

  // if any of the possibilities gives result, return true
  return take || notTake;
}
```

Time: O(2^n) two options for every element - take or not take
Space: O(n) auxillary stack space of n

### Recursion + Memoization

```js
const memo = {};
f(ind, target) {
  const key = `${ind}#${target}`;
  if (key in memo) return memo[key];

  // base cases
  if (target === 0) return true;
  if (ind === 0) return arr[0] === target;

  // not take
  let notTake = f(ind - 1, target);

  // take
  let take = false;
  if (target >= arr[ind]) {
    f(ind - 1, target - arr[ind]);
  }

  // if any of the possibilities gives result, return true
  return memo[key] = take || notTake;
}
```

Time: O(n \* target) two options for every element - take or not take
Space: O(n \* target) auxillary stack space of n

### Tabulation

```js
f(ind, target) {
  const dp = [...new Array(n)].map(() => new Array(target).fill(false));

  // 1. base cases
  // if target === 0 at any point, result is true
  for (let i = 0; i < n; i++) dp[i][0] = true;
  dp[0][arr[0]] = true;

  // 2. nested loops
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < target + 1; j++) {

    }
  }
}
```

Time: O(n \* target) two options for every element - take or not take
Space: O(n \* target) auxillary stack space of n
