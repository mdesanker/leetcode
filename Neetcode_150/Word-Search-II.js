/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const ROWS = board.length,
    COLS = board[0].length;

  const res = [];
  const root = buildTrie(words);

  // check every cell on the board
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      // run dfs with empty string starting at the root of the trie
      dfs(r, c, root, "");
    }
  }

  return res;

  // build the trie
  function buildTrie(words) {
    const root = {};

    for (let word of words) {
      let current = root;
      for (let char of word) {
        if (!current[char]) current[char] = {};
        current = current[char];
      }
      current.end = true;
    }
    return root;
  }

  function dfs(r, c, node, word) {
    // base case
    if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return;
    // cell has already been visited
    if (!board[r][c]) return;
    // if current node does not have the current cell value as a child
    if (!node[board[r][c]]) return;

    let tmp = board[r][c];
    // move current node to child
    node = node[board[r][c]];
    // add new character to word string
    word += board[r][c];

    // if we have reached the end of a word, push word into res array
    if (node.end) {
      res.push(word);
      // prevent duplicates (instead of using a set to store result array and converting to array on returning answer)
      node.end = false;
    }

    // clear cell so that it won't be revisted
    board[r][c] = null;

    dfs(r + 1, c, node, word);
    dfs(r - 1, c, node, word);
    dfs(r, c + 1, node, word);
    dfs(r, c - 1, node, word);

    // reset cell value
    board[r][c] = tmp;
  }
};

// Time: O(rc * 4 * 3^(L - 1)) where L is max length of word, and r * c is the dimensions of the board.
//    At every letter, we can check in 4 directions (3 directions after the first letter), so that is 4 options per letter (4 * 3^(L - 1))
// Space: O(n) where n is total number of letters in dictionary (every letter is turned into a node and every letter is unique)

/**
For every single word, we will run dfs at every single position in mn grid and see if we can make the word
e.g. 
First word is "oath"
If I start at [0, 0] can I make "oath"? no
If I start at [0, 1] can I make "oath"? no
etc...

Once I check every space for whether or not can make oath, I can move of to the next word and repeat
Second word is "pea"
If I start at [0, 0] can I make "pea"? no
If I start at [0, 1] can I make "pea"? no
etc...

Optimization:
Run dfs starting from every position in matrix a single time
By using a trie (prefix tree) I can check for every possible word that can be created at a position based on the prefix
If there are no valid words that can be built with the current prefix, then I can return and not waste time traversing 
At every step, I will check if the current letter is the end of a word I am looking for, and can add this to the res array

e.g. 
[0, 0] is an "o", which words can I make starting with "o"?
[0, 1] is an "a", which words can I make starting with "a"?

Solution:

Build Trie Helper function:
The trie will be built using nested hashmaps and we will add all the words from the dictionary
Initialize the root with an empty object

For each word
Initialize pointer to the root of the trie, so that we can check for common prefixes and add words to the data structure correctly
For every char in the word
If that char does not exist as a key at the current node, create a key pointing to an empty object
Move the pointer ahead
Once we have created a node for every char, mark the final node as the end of a word
Return the trie by returning the root

Search Helper function:
We will need to pass the coordinates of the current letter being considered, the node in the trie we are currently at, 
and the current word we have built so far as parameters

Base cases
If coordinates are out of bounds return
If current board value is null return (we will mark visited spaces a null so that we do not traverse cells already visited)
If the current cell is not a child of the node we are at return (we cannot build a word in the dictionary if the cell is not a child)

Save the current board value in a temp variable

Update the node to the child that matches the board value
Add the current cell value to the word string to update the current word

Then check if the current node is the end of a word
If it is, push the word onto the res array
Then change the end marker on the node to false so that we don't add this word again (prevent duplicates)

Change the current board value to null, so that we do not try and traverse backwards over already visited cells

Recursively call search function on all four adjacent grid positions

Reset the board value using the temporary variable that was created previously

Main function:
Initialize an empty result array
Initialize the trie using the build trie helper function assigned to a variable

For every cell on the board, we will call the search function, using the root of the trie as the starting node, and an empty string as the initial word

TC: O(rc*4*3^(L - 1)) after the first letter, we can move in 4 different directions to find the second letter, after the second letter, 
  we can move in at most 3 directions (the cell we just came from has been marked null so it cannot be re-traversed), and this continues for the
  length of the word: 4 * 3 ^ (L - 1)
  We run this search operation at every cell on the board, so multiply the above by the size of the board: r * c
SC: O(n) in the worst case scenario, we have to create a trie node for every single letter in the dictionary (every letter is unique so 
  no words share any prefixes)
 */
