# Subsets

```js
var subsets = function (nums) {
  const res = [];
  const subset = [];

  function dfs(i) {
    if (i >= nums.length) {
      res.push(subset.slice());
      return;
    }

    subset.push(nums[i]);
    dfs(i + 1);

    subset.pop();
    dfs(i + 1);
  }
  dfs(0);
  return res;
};

// Time: O(n * 2^n) 2^n to generate a subset, then each subset can be of length n
// Space: O(n) to track subset array
```

# Subsets II

```js
var subsetsWithDup = function (nums) {
  const res = [];
  const curr = [];

  nums.sort((a, b) => a - b);

  function backtrack(ind) {
    res.push(curr.slice());

    for (let i = ind; i < nums.length; i++) {
      if (i > ind && nums[i] === nums[i - 1]) continue;

      curr.push(nums[i]);
      backtrack(i + 1);
      curr.pop();
    }
  }
  backtrack(0);
  return res;
};

// Time: O(n * 2^n) 2 choices per value (include or exclude) to the power of n for n values in input --> 2^n subsets. Each subset is at most length n
// Space: O(n * 2^n)
```

# Combination Sum

```js
var combinationSum = function (candidates, target) {
  const res = [];
  const curr = [];

  function dfs(i, total) {
    if (total === target) {
      res.push(curr.slice());
      return;
    }
    if (i >= candidates.length || total > target) {
      return;
    }

    curr.push(candidates[i]);
    dfs(i, total + candidates[i]);

    curr.pop();
    dfs(i + 1, total);
  }

  dfs(0, 0);
  return res;
};

// Time: O(2^n) where n is target value
// Space: O(n)
```

# Combination Sum II

```js
var combinationSum2 = function (candidates, target) {
  const res = [];
  const curr = [];

  candidates.sort((a, b) => a - b);

  function dfs(ind, total) {
    if (total === target) {
      res.push(curr.slice());
    }

    if (total > target) {
      return;
    }

    for (let i = ind; i < candidates.length; i++) {
      if (i > ind && candidates[i] === candidates[i - 1]) continue;

      curr.push(candidates[i]);
      dfs(i + 1, total + candidates[i]);
      curr.pop();
    }
  }
  dfs(0, 0);
  return res;
};

// Time: O(2^n) where n is target value
// Space: O(n)
```

# Permutations

```js
var permute = function (nums) {
  const res = [];
  const curr = [];

  function dfs(used) {
    if (curr.length === nums.length) {
      res.push(curr.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      curr.push(nums[i]);
      used[i] = true;

      dfs(used);

      curr.pop();
      used[i] = false;
    }
  }
  dfs(new Array(nums.length).fill(false));
  return res;
};

// Time: O(n * n!) there are n! permutations for a set of n numbers. Inserting number into permuation of size n takes O(n) time
// Space: O(n * n!)
```
