/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  // edge case: if endWord not in wordList, immediately return 0
  if (!wordList.includes(endWord)) return 0;

  // beginWord does not have to be in wordList, so add it
  wordList.push(beginWord);

  // build adj list
  const adj = {};
  // for each word, create pattern by swapping each char and add as key to adj list
  for (let word of wordList) {
    for (let i = 0; i < word.length; i++) {
      const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
      // create a key for pattern if doesn't already exist
      if (!adj[pattern]) adj[pattern] = [];
      adj[pattern].push(word);
    }
  }

  const visited = new Set();
  const q = [];

  // push beginWord into visited and queue
  visited.add(beginWord);
  q.push(beginWord);
  // variable to track number to steps (including the starting word)
  let res = 1;

  while (q.length) {
    let length = q.length;
    for (let i = 0; i < length; i++) {
      const word = q.shift();

      // if at target, return number of steps
      if (word === endWord) return res;

      // find neighbors of current word and add to queue
      // we need to find all patterns for current word first
      for (let i = 0; i < word.length; i++) {
        const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
        for (let nei of adj[pattern]) {
          // skip all visited words
          if (!visited.has(nei)) {
            q.push(nei);
            visited.add(nei);
          }
        }
      }
    }
    // increment res counter after every pass
    res++;
  }
  // if can't find path to endWord, return 0
  return 0;
};

// Time:
// Space:

/**
This is a graph problem because we can connect nodes (words in wordList) by which words are able to be adjacent to each other (only 1 char diff)
This will be a a bidirection graph

e.g. ["hot", "dot", "cog"]
"hot" and "dot" differ by 1 letter, they will be connected by an edge
"hot" and "cog" differ by 2 letters, the will not be connected by an edge

Naive way to build adj list is with nested loops [TLE]
O(n^2 * m) n^2 to iterate through every combination of word pairs, then m to iterate through length of word and compare every char

Correct way: [Accepted]
Constraints 
len(word) <= 10
len(list) <= 5000

Time complexity to build adj list can be reduced to O(n * m^2)

BFS usually more efficient to find shortest path
TC: O(n^2 * m) for BFS algo. n is number of edges and m is length of word

Building adj list:
Convert each word into string of possible patterns it can match, where each letter is converted to a wild card
Words with matching patterns can be mapped to each other

hot: "*ot", "h*t", "ho*"
dot: "*ot", "d*t", "do*"

The first pattern for both words matches, so there will be an edge between these words

Build adj list by {pattern: [words]} => {"*ot": ["hot", "dot"]}

To find neighbors for a word, we first have to find all the patterns for the word, 
then we can search in adj list to find the words that map to the patterns (ignoring the word itself in each array)

We iterate through every word in list (n), then through every char in word to generate patterns (m), then add word to list (m): O(n * m^2)

Solution:
Edge case:
wordList must contain endWord, if it doesn't, return 0

Push beginWord onto wordList because it doesn't have to be included

Build adj list:
For each word in wordList, we will need to iterate through all possible patterns and add substitute a "*" for each letter
Then we create a key in the adj list, and push the word onto the array for that key

// build adj list
const adj = {};
// for each word, create pattern by swapping each char and add as key to adj list
for (let word of wordList) {
  for (let i = 0; i < word.length; i++) {
    const pattern = word.slice(0, i) + "*" + word.slice(i + 1);
    // create a key for pattern if doesn't already exist
    if (!adj[pattern]) adj[pattern] = [];
    adj[pattern].push(word);
  }
}

We are using BFS becvause it is more efficient for shortest path finding, so we will need a queue and a set to track visited nodes
Start by pushing the starting node (beginWord) into the queue and visited set

Set result counter to 1 initially, because we want to count the number of words we have to traverse, and the beginWord counts as 1

While there are elements in the queue, we will iterate through them
Shift first element from queue
If this word is the endWord, then we are done and can return the current distance counter

If its not the the endWord, then we will need to push its neighbors onto the queue for the next iteration
To find its neighbors, we need to generate all its patterns (swap "*" for each letter) and then get the words matching that pattern from adj list
If the neighbor has already been visited, we will skip it
Else we push the neighbor onto the queue and mark it as visited

After we have iterated through all the words in this queue length, increment distance counter before we move to next set of words

If we traverse the graph and don't find the endWord, we weren't able to build a word ladder, return 0

QUESTIONABLE
TC: O(n^2 * m) for BFS algo. n is number of edges and m is length of word
SC: O(n^2 * m) memory needed to build adj list
 */
