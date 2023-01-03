# Dynamic Programming - Recursion and Memoization (Top-Down DP)

Notes taken from [Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges](https://www.youtube.com/watch?v=oBt53YbR9Kk)

Pattern of overlapping subproblems

Fibonacci Sequence - write a function fib(n) that takes in a number as an argument and returns the nth number of the Fibonacci sequence.

```js
const fib = (n) => {
  // base cases
  if (n <= 2) return 1;
  // fib number is sum of previous two numbers
  return fib(n - 1) + fib(n - 2);
};

// function too slow with large n

// Time: O(2^n)
// Space: O(n)
```

```js
const dib = (n) => {
  if (n <= 1) return;
  dib(n - 1);
  dib(n - 1);
};

// Time: O(2^n) where 2 is number of decisions on each level and n is the height of the tree
// Space: O(n) number of function calls is equal to height of tree (n), because one leaf put on stack at a time
```

## Memoization

- Store results from duplicate subproblems so do not need to repeat completed work
- Ideal to use a fast data structure - hashmap

```js
// memoization
// hashmap, key = arguments(n), value = return value
const fib = (n, memo = {}) => {
  // check if argument stored in memo
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  // pass memo into recursive calls
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
};

// function too slow with large n

// Time: O(n)
// Space: O(n)
```

### Grid Traveler

Traveler on 2D grid, begin top-left corner and travel to bottom-right. Can only move down or right. How many ways can you travel to bottom-right with grid of dimensions m \* n?

```js
// brute force
const gridTraveler = (m, n) => {
  // if grid (1, 1) only 1 way
  if (m === 1 && n === 1) return 1;
  // if grid empty, no way to travel
  if (m === 0 || n === 0) return 0;

  // two options: move down (m - 1) or move right (n - 1)
  return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
};

// No memoization
// Time: O(2^(n + m)) decrement n or m by 1 for each level, so will take n + m levels to reach (1, 1). 2 possible decisions per level (down or right)
// Space: O(n + m) height of tree is number of levels
```

```js
// memoization
const gridTraveler = (m, n, memo = {}) => {
  // concatenate coordinates as a string
  const key = m + "," + n;
  // are arguments in the memo
  if (key in memo) return memo[key];

  // if grid (1, 1) only 1 way
  if (m === 1 && n === 1) return 1;
  // if grid empty, no way to travel
  if (m === 0 || n === 0) return 0;

  // two options: move down (m - 1) or move right (n - 1)
  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
  return memo[key];
};

// Memoization
// Time: O(n * m) n * m possible nodes
// Space: O(n + m)
```

## Memoization Recipe

1. Make it work (brute force)

   - Visualize problem as a tree
   - Implement tree using recursion
   - Test it

2. Make it efficient

   - Add memo object {key: value}
   - Add a base case to return memo values
   - Store return values into the memo

### canSum

Write a function `canSum(targetSum, numbers)` that return boolean indicating whether its possible to generate the targetSum using numbers from the array. You may use an element of the array as many times as needed. You may assume all input numbers are nonnegative.

```js
const canSum = (targetSum, numbers) => {
  // base case
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of numbers) {
    // call canSum on remainder
    if (canSum(targetSum - num, numbers)) return true;
  }

  return false;
};

console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [4, 2])); // false

// Time: O(n^m) max height of tree is targetSum m (assuming subtract 1 each time) and n is length of numbers (can make n choices per level)
// Space: O(m) where  m is height of tree
```

```js
const canSum = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];

  // base case
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;

  for (let num of numbers) {
    // call canSum on remainder
    memo[targetSum] = canSum(targetSum - num, numbers, memo);
    if (memo[targetSum]) return true;
  }

  return false;
};

console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [4, 2])); // false
console.log(canSum(300, [7, 14])); // false

// Time: O(m * n) where m is targetSum and n is array length
// Space: O(m) where m is height (targetSum)
```

### howSum

Write function `howSum(targetSum, numbers)` that returns an array containing a combination of numbers that adds up to exactly targetSum. If no combination, return null. If multiple possible combinations, return any single one.

```js
const howSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers);
    if (remainderResult) return [...remainderResult, num];
  }
  return null;
};

console.log(howSum(7, [2, 3])); // [2, 3, 3]
console.log(howSum(7, [5, 3, 4, 7])); // []
console.log(howSum(7, [4, 2])); // null
console.log(howSum(300, [7, 14])); // null

// Time: O(m * n^m) m = targetSum, n = numbers.length; Multiply by m to build the remainderResult array at every step
// Space: O(m) m + m for height of tree and length of array, but simplify to O(m)
```

```js
const howSum = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];

  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    memo[targetSum] = howSum(targetSum - num, numbers, memo);
    if (memo[targetSum]) return [...memo[targetSum], num];
  }
  return null;
};

console.log(howSum(7, [2, 3])); // [2, 3, 3]
console.log(howSum(7, [5, 3, 4, 7])); // []
console.log(howSum(7, [4, 2])); // null
console.log(howSum(300, [7, 14])); // null

// Time: O(n*m^2) m = targetSum, n = numbers.length;
// Space: O(m^2) m keys in memo with worst case values being an array of m elements
```

### bestSum

`bestSum(targetSum, numbers)` returns an array containing the shortest combination of numbers that add up to exactly the targetSum. If tie, return any of shortest.

```js
const bestSum = (targetSum, numbers) => {
  let shortest = null;

  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const res = bestSum(targetSum - num, numbers);
    if (res) {
      const combination = [...res, num];
      if (!shortest || combination.length < shortest.length) {
        shortest = combination;
      }
    }
  }

  return shortest;
};

console.log(bestSum(7, [5, 3, 4, 7])); // [7]
console.log(bestSum(8, [2, 3, 5])); // [3, 5]
console.log(bestSum(8, [1, 4, 5])); // [4, 4]
console.log(bestSum(100, [1, 2, 5, 25])); // [25, 25, 25, 25]

// m = targetSum
// n = numbers.length

// Time: O(n^m * m)
// Space: O(m^2) height is m and each stack frame has an array of length m
```

```js
const bestSum = (targetSum, numbers, memo = {}) => {
  if (targetSum in memo) return memo[targetSum];
  let shortest = null;

  if (targetSum === 0) return [];
  if (targetSum < 0) return null;

  for (let num of numbers) {
    const res = bestSum(targetSum - num, numbers, memo);
    if (res) {
      const combination = [...res, num];
      if (!shortest || combination.length < shortest.length) {
        shortest = combination;
      }
    }
  }

  memo[targetSum] = shortest;
  return memo[targetSum];
};

console.log(bestSum(7, [5, 3, 4, 7])); // [7]
console.log(bestSum(8, [2, 3, 5])); // [3, 5]
console.log(bestSum(8, [1, 4, 5])); // [4, 4]
console.log(bestSum(100, [1, 2, 5, 25])); // [25, 25, 25, 25]

// Time: O(m^2 * n)
// Space: O(m^2) m possible memo keys with value which is array of length m
```

### canConstruct

`canConstruct(target, wordBank)` that returns boolean indicating whether can make target by concatenating elements of wordBank array. May reuse elements of wordBank as many times as needed.

```js
const canConstruct = (target, wordBank) => {
  if (target === "") return true;

  for (const word of wordBank) {
    // check if word is at beginning of target
    if (target.indexOf(word) === 0) {
      // call recursively on suffix of target
      if (canConstruct(target.slice(word.length), wordBank)) return true;
    }
  }

  return false;
};

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // true (abc + def)
console.log(canConstruct("", ["cat", "dog", "mouse"])); // true (use no elements from array)
console.log(
  canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // false
console.log(
  canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeeeeee",
  ])
); // false

// m = target.length
// n = wordBank.length

// Time: O(n^m * m) branching factor ^ height, * m for slice operation
// Space: O(m^2) m height * m for the copy of the string on each stack frame
```

```js
const canConstruct = (target, wordBank, memo = {}) => {
  if (target in memo) return memo[target];

  if (target === "") return true;

  for (const word of wordBank) {
    // check if word is at beginning of target
    if (target.indexOf(word) === 0) {
      // call recursively on suffix of target
      if (canConstruct(target.slice(word.length), wordBank, memo)) {
        memo[target] = true;
        return true;
      }
    }
  }

  memo[target] = false;
  return false;
};

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // true (abc + def)
console.log(canConstruct("", ["cat", "dog", "mouse"])); // true (use no elements from array)
console.log(
  canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // false
console.log(
  canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeeeeee",
  ])
); // false

// m = target.length
// n = wordBank.length

// Time: O(n * m^2)
// Space: O(m^2)
```

### countConstruct

`countConstruct(target, wordBank)` returns number of ways the target can be cosntructed by concatenating elements of wordBank array. May reuse wordBank elements.

```js
const countConstruct = (target, wordBank) => {
  let total = 0;

  if (target === "") return 1;

  for (const word of wordBank) {
    if (target.indexOf(word) === 0) {
      total += countConstruct(target.slice(word.length), wordBank);
    }
  }
  return total;
};

console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log(
  countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // 0
console.log(
  countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeeeeee",
  ])
); // 0

// m = target.length
// n = wordBank.length

// Time: O(n^m * m) branching factor ^ height, * m for slice operation
// Space: O(m^2) m height * m for the copy of the string on each stack frame
```

```js
const countConstruct = (target, wordBank, memo = {}) => {
  if (target in memo) return memo[target];

  let total = 0;

  if (target === "") return 1;

  for (const word of wordBank) {
    if (target.indexOf(word) === 0) {
      total += countConstruct(target.slice(word.length), wordBank, memo);
    }
  }
  memo[target] = total;
  return total;
};

console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log(
  countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // 0
console.log(
  countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeeeeee",
  ])
); // 0

// Time: O(n * m^2)
// Space: O(m^2)
```

### allConstruct

`allConstruct(target, wordBank)` returns 2D array containing all the ways the target can be constructed by concatenating elements of the wordBank array. Can reuse wordBank elements

```js
const allConstruct = (target, wordBank) => {
  if (target === "") return [[]];

  const res = [];

  for (const word of wordBank) {
    if (target.indexOf(word) === 0) {
      const suffixWays = allConstruct(target.slice(word.length), wordBank);
      const targetWays = suffixWays.map((way) => [word, ...way]);
      result.push(...targetWays);
    }
  }
  return res;
};

console.log(
  allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
); // [["ab", "cd", "ef"], ["ab", "c", "def"], ["abc", "def"], ["abcd", "ef"]]
console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // [["purp", "le"], ["p", "ur", "p", "le"]]
console.log(
  allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // [[]]
console.log(
  allConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeeeeee",
  ])
); // [[]]
```

Because this answer requies you to traverse entire tree to return all options, memoization doesn't provide much benefit

```js
const allConstruct = (target, wordBank, memo = {}) => {
  if (target in memo) return memo[target];

  if (target === "") return [[]];

  const res = [];

  for (const word of wordBank) {
    if (target.indexOf(word) === 0) {
      const suffixWays = allConstruct(
        target.slice(word.length),
        wordBank,
        memo
      );
      const targetWays = suffixWays.map((way) => [word, ...way]);
      res.push(...targetWays);
    }
  }
  memo[target] = res;
  return res;
};

console.log(
  allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
); // [["ab", "cd", "ef"], ["ab", "c", "def"], ["abc", "def"], ["abcd", "ef"]]
console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // [["purp", "le"], ["p", "ur", "p", "le"]]
console.log(
  allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // [[]]
console.log(
  allConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", [
    "e",
    "ee",
    "eee",
    "eeee",
    "eeeeeeee",
  ])
); // [[]] This is no longer worst case - worst case is when you have to create a massive 2D array

// Time: O(n^m) can't get away from exponential complexity because need all possibilities
// Space: O(m) only refering to call stack space
```

# Dynamic Programming - Tabulation (Bottom-Up DP)

### fib

Return nth number of Fibonacci sequence

```js
const fib = (n) => {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  // console.log(dp);
  for (let i = 0; i < n; i++) {
    dp[i + 1] += dp[i];
    dp[i + 2] += dp[i];
    console.log(dp);
  }
  return dp[n];
};

// n:      0, 1, 2, 3, 4, 5, 6, 7,  ...
// fib(n): 0, 1, 1, 2, 3, 5, 8, 13, ...

// Time: O(n)
// Space: O(n)
```

### gridTraveler

Travel from top-left to bottom-right corner of n x m grid. Return how many ways you can make this trip.

```js
const gridTraveler = (ROWS, COLS) => {
  // const grid = [];
  // build r + 1 x c + 1 grid
  // for (let i = 0; i < ROWS + 1; i++) {
  //   grid.push(new Array(COLS + 1).fill(0));
  // }

  const grid = new Array(ROWS + 1)
    .fill()
    .map(() => new Array(COLS + 1).fill(0));
  grid[1][1] = 1;

  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      if (r + 1 <= ROWS) grid[r + 1][c] += grid[r][c];
      if (c + 1 <= COLS) grid[r][c + 1] += grid[r][c];
    }
  }
  return grid[ROWS][COLS];
};

console.log(gridTraveler(3, 3)); // 6

// Time: O(n * m)
// Space: O(n * m)
```

## Tabulation Strategy

- Visualize problem as a table
- Size the table based on the inputs (caution for off by 1 error)
- Initialize the table with default values
- Seed the trivial answer into the table
- Fill further positions based on the current position

### canSum Tabulation

`canSum(targetSum, numbers)` return boolean if can generate sum using numbers. Can reuse elements, assume all inputs non-negative.

```js
const canSum = (targetSum, numbers) => {
  const dp = new Array(targetSum + 1).fill(false);
  dp[0] = true; // targetSum = 0 is always true

  // use targetSum for upper limit, not dp.length, because it won't change
  for (let i = 0; i < targetSum + 1; i++) {
    // check for positions with true
    if (dp[i]) {
      for (const num of numbers) {
        dp[i + num] = true;
      }
    }
  }
  return dp[targetSum];
};

console.log(canSum(7, [5, 3, 4])); // true

// m: targetSum
// n: numbers.length

// Time: O(m * n) look through numbers for each element in targetSum
// Space: O(m)
```

### howSum Tabulation

`howSum(targetSum, numbers)` return array of combinations that can be used to generate targetSum. Can reuse elements, assume all inputs non-negative.

```js
const howSum = (targetSum, numbers) => {
  const dp = new Array(targetSum + 1).fill(null);
  dp[0] = [];

  for (let i = 0; i < targetSum + 1; i++) {
    if (dp[i]) {
      for (const num of numbers) {
        dp[i + num] = [...dp[i], num];
      }
    }
  }
  return dp[targetSum];
};

console.log(howSum(7, [5, 3, 4])); // [3, 4]

// m: targetSum
// n: numbers.length

// Time: O(m^2 * n) look through numbers for each element in targetSum and copy over subarray of worst case size m
// Space: O(m^2) 2D array
```

### bestSum Tabulation

`bestSum(targetSum, numbers)` return shortest combination that can be used to generate targetSum. Can reuse elements, assume all inputs non-negative.

```js
const bestSum = (targetSum, numbers) => {
  const dp = new Array(targetSum + 1).fill(null);
  dp[0] = [];

  for (let i = 0; i < targetSum + 1; i++) {
    if (dp[i]) {
      for (const num of numbers) {
        const combination = [...dp[i], num];
        if (!dp[i + num] || combination.length < dp[i + num].length) {
          dp[i + num] = combination;
        }
      }
    }
  }
  return dp[targetSum];
};

console.log(bestSum(7, [5, 3, 4])); // [3, 4]
console.log(bestSum(8, [2, 3, 5])); // [3, 5] (not [2, 2, 2, 2], [2, 3, 3])

// m: targetSum
// n: numbers.length

// Time: O(m^2 * n) look through numbers for each element in targetSum and copy over subarray of worst case size m
// Space: O(m^2) 2D array
```

### canConstruct

```js
const canConstruct = (target, wordBank) => {
  const dp = new Array(target.length + 1).fill(false);
  dp[0] = true; // empty string is true

  // iterate through target string
  for (let i = 0; i < target.length + 1; i++) {
    // O(m)
    // if position is true (can be made with wordBank)
    if (dp[i]) {
      for (const word of wordBank) {
        // O(n)
        // match word to current position in target
        if (target.indexOf(word) === i) {
          // O(m)
          // add word length to current position and set true
          dp[word.length + i] = true;
        }
      }
    }
  }
  return dp[target.length];
};

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // true

// m: target.length
// n: wordBank.length

// Time: O(m^2 * n) additional m due to matching words to target string
// Space: O(m)
```

### countConstruct

```js
const countConstruct = (target, wordBank) => {
  const dp = new Array(target.length + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < target.length + 1; i++) {
    if (dp[i] === 1) {
      for (const word of wordBank) {
        if (target.indexOf(word) === i) {
          dp[word.length + i] += dp[i];
        }
      }
    }
  }
  return dp[target.length];
};

console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2

// m: target.length
// n: wordBank.length

// Time: O(m^2 * n) additional m due to matching words to target string
// Space: O(m)
```

### allConstruct

```js
const allConstruct = (target, wordBank) => {
  const dp = new Array(target.length + 1).fill().map(() => []);
  dp[0] = [[]];

  for (let i = 0; i < target.length + 1; i++) {
    for (const word of wordBank) {
      if (target.indexOf(word) === i) {
        const combinations = dp[i].map((subArray) => [...subArray, word]);
        dp[i + word.length].push(...combinations);
      }
    }
  }
  return dp[target.length];
};

console.log(
  allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])
); // [["ab", "cd", "ef"], ["ab", "c", "def"], ["abc", "def"], ["abcd", "ef"]]
console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // [["purp", "le"], ["p", "ur", "p", "le"]]
console.log(
  allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])
); // [[]]

// m: target.length
// n: wordBank.length

// Time: O(n^m) exponential beacuse need to return all possible combinations
// Space: O(n^m)
```

## Dynamic Programming

- Notice any overlapping subproblems
- Decide what is the trivially smallest input (base case)
- Think recursively and use memoization
- Think iteratively to use tabulation
- Draw a strategy first!!!
