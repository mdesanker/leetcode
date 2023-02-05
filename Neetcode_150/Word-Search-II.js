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
      // prevent duplicates
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

// Time: O()
// Space: O()

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
e.g. 
[0, 0] is an "o", which words can I make starting with "o"?
[0, 1] is an "a", which words can I make starting with "a"?
 */
