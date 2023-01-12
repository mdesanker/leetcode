// https://leetcode.com/problems/target-sum/solutions/455024/dp-is-easy-5-steps-to-think-through-dp-questions/

Outline for thinking process to approach DP problems

1. Category

Most DP problems can be boiled down to a few categories. Recognizing the category allows us to frame a new question into something we already know.

- 0/1 Knapsack
- Unbounded Knapsack
- Shortest Path (e.g. Unique Paths I/II)
- Fibonacci Sequence (e.g. House Robber, Jump Game)
- Longest Common Substring/Subsequence

2. States

What variables do we need to keep track of in order to reach our optimal result?

_Index_ represents the index of the input subset we are considering. This tells us what values we have considered, what values we haven't considered, and what value we are currently considering. As a general rule, index is a required state in nearly all dynamic programming problems, except for shortest paths which is row and column instead of a single index.

3. Base Case

Base cases need to relate directly to the conditions required by the anwer we are seeking.

There are two base cases:

- When current state is valid
- When current state is invalid

4. Decisions

DP is all about making the optimal decision. In order to make optimal decision, we have to try all decisions first. Decisions will have to bring us closer to the base case and lead us towards the question we want to answer. Base case (covered in step 3) works in tandem with decision step.
