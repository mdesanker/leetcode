# 0/1 Knapsack

- A bag is called a knapsack, has a certain capacity (weight capacity)
- Input is set of items where each item has a weight and a value (e.g. represented in weight array and value array)
- Goal is to fill knapsack while maximizing value
- Variations
  - Fractional: if an entire item cannot fit, the item can be broken into pieces (weight broken accordingly) in order to fill knapsack
  - 0/1: an item is either included or not included and there is only one instance of an item
  - Unbounded: there is an unlimited supply of each item, so can add same item repeatedly

## How to Identify

- Input: weight[], value[], and knapsack capacity
- Output: maximize profit

To find out if problem is DP or not:

1. Given a choice (have to choose which items to include)
2. Have to find optimal (e.g. max, min, largest, greatest)

After identifying a DP problem --> write recursive solution --> memoization (DP) --> top-down? (DP)

## 0/1 Knapsack Recursive

Input:
const weight = [1, 3, 4, 5];
const value = [1, 4, 5, 7];
const capacity = 7;

Output: fill knapsack to maximize profit

Recursive solution:

- Base condition
- Choice diagram

### Base condition

Think of smallest valid input

const weight = [1, 3, 4, 5]; include no items n -> 0
const value = [1, 4, 5, 7];
const capacity = 7; empty knapsack w === 0

if (n === 0 || w === 0)

### CHoice diagram

If item's weight is less than or equal to capacity, can include or exclude
If item's weight is greater than capacity, must exclude

```js
function knapsack(weight, value, capacity, n) {
  if (n === 0 || w === 0) {
    return 0;
  }

  if (weight[n - 1] <= capacity) {
    let profit1 =
      val(n - 1) + knapsack(weight, value, capacity - weight[n - 1], n - 1);
    let profit2 = knapsack(weight, value, capacity, n - 1);
    return Math.max(profit1, profit2);
  } else if (weight[n - 1] > capacity) {
    return knapsack(weight, value, capacity, n - 1);
  }
}
```
