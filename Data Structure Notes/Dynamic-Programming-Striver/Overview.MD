# DP Topics Covered

- 1D DP
- 2D DP on grids/matrices
- Subsequences
- Strings
- Stocks
- Partition DP
- DP on rectangles

## Framework

1. Express current problem in terms of index

2. Explore all possibilites of that index

   - Take/not take
   - Explore possible paths/options

3. Return result

   - Maximum: Math.max(possibilities)
   - Minimum: Math.min(possibilities)
   - Count: sum(possibilities)
   - Possible: logical OR of possibilities

4. Base case - what happens when you reach index 0

   - Count: return 1 or 0
   - Possible: return true or false

## Approach

1. Develop brute force solution using recursion - key points are the recurrence relation and the base cases

2. Memoize to build top down solution

3. Convert to bottom up solution using dp array - copy over recurrence relation

4. Optimize space if only need previous row or value
