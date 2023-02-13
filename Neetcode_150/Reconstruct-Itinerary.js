/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const adj = {};

  // want airports sorted in lexicographical order, so that our answer is in lexicographical order if there are multiple solutions
  // sort tickets by dst if src is equal, otherwise by src
  // same as: tickets.sort();
  tickets.sort((a, b) => {
    if (a[0] === b[0]) return a[1] < b[1] ? -1 : 1;
    return a[0] < b[0] ? -1 : 1;
  });

  // build adj list using tickets
  for (let [src, dst] of tickets) {
    if (!adj[src]) adj[src] = [];
    adj[src].push(dst);
  }

  // always start from JFK, so add it to res array
  const res = ["JFK"];

  function dfs(src) {
    // we are done when we have a destination for every ticket + 1 for the starting location, "JFK"
    if (res.length === tickets.length + 1) return true;

    // if src has no neighbors, we cannot connect to any other airports
    // if src was never added to adj list, then it has no neighbors
    if (!adj[src]) return false;

    // iterate through all neighbors and see if we can find a successful path
    // because we temporarily remove nei from the adj list, save a copy of the neighbors that will not change so that we can iterate over it
    let temp = [...adj[src]];
    for (let i = 0; i < temp.length; i++) {
      const nei = adj[src][i];
      // remove nei from adj[src] so it is not traversed again (similar effect to a visited array)
      adj[src].splice(i, 1);
      res.push(nei);
      // recursively call dfs on this neighbor
      if (dfs(nei)) return true;
      // re-add nei to adj[src] because we need to backtrack if nei doesn't yeild successful path
      adj[src].splice(i, 0, nei);
      res.pop();
    }
    return false;
  }

  // always start at JFK, call dfs from this location
  dfs("JFK");
  return res;
};

/**
We need to use a backtracking approach for this problem, because we want to enumerate all possible solutions if a trial-fail-and-fallback strategy. 
At each airport, we have several possible destinations to fly to. With backtracking we try each possible destination, marking the choice at each iteration. 
If the path does not lead to the desired destination, then we fallback to the previous state and and try the next option/choice.

We also use a greedy approach (make locally optimal choice at each step, with the intent of reaching global optimum at the end). 
At each airport, we pick the destination greedily in lexical order (the one with the smallest lexical order would be tested first). 
This is achieved by sorting the tickets array in lexicographical order.

Solution:
For this greedy approach, we need to sort the tickets in lexicographical order, first by the source if they are different, and if they are the same, 
then by the destination.
The build in javascript array.sort() function will do this by default, so we do not need to pass a custom compare function. 
But if we did, we would need to check if one word is "<" than another, and if so, return -1 else return 1 (this is different than if 
we are comparing numbers where we subtract one number from another)

tickets.sort((a, b) => {
    if (a[0] === b[0]) {
        return a[1] < b[1] ? -1 : 1;
    }
    else return a[0] < b[0] ? -1 : 1;
})

Now we can build the adj list, and it will put the neighbors in lexicographical order because the tickets are already sorted. 
This part is pretty straightforward

const adj = {};
for (let [src, dst] of tickets) {
    if (!adj[src]) adj[src] = [];
    adj[src].push(dst);
}

We need a result array to store the path
Because we always start at JFK we can add it to res immediately

DFS function:
Parameter: 
src - we will pass the source/node that is currently being considered

Base cases:
Once we have added every ticket to the res array, we will be done. Every ticket will result in a new node in the res array, 
not including the starting node (JFK). Therefore, once final length of res array = tickets.length + 1 (for the initial JFK) we will be done. 
Return true

If we don't have all the tickets added to res, and the current source/node doesn't have any neighbors, then this is not a valid path, 
because we cannot continue. Return false

Recursive case:
We will iterate through every nei, adding it to the path and checking if we can get to the destination if we follow it. 
We will need to remove the neighbor we are adding from the adj[src] so that it will not be traversed again, which will 
change the length of the list of neighbors
We will clone the neighbor list and iterate over the clone so we don't affect the for-loop mid loop

It will simplify things slightly to pull the neighbor into a variable

Remove nei from adj[src] buy splicing the element at index i (which is the index of nei);
Then push nei onto the res array

Then we call the dfs function on the nei airport/node
If this dfs call return true, then we found a successful path, and can return true immediately to break the recursive calls

Otherwise, we did not successfully find a path to destination
We need to backtrack, remove nei from res and re-add nei to adj[src] so that we can try the next neighbor 

If we make it through all possible neighbors and don't find a valid path, return false

We call the dfs function on "JFK" as thats the starting node

TC: O(e^2) time to traverse graph is equal to the size (v + e), but because we backtrack its (v + e)^2. e will be greater than or equal to v, 
  so can approximate as O(e^2)
SC: O(e + v) adj list stores every edge and every vertex
 */
