/**
 * @param {number[][]} rooms
 * @return {boolean}
 */

// DFS Implementation
//https://leetcode.com/problems/keys-and-rooms/solutions/1116707/js-python-java-c-easy-dfs-stack-solution-w-explanation/?orderBy=most_votes&languageTags=javascript

var canVisitAllRooms = function (rooms) {
  // track visited rooms in array
  let visited = new Array(rooms.length).fill(false);
  // store keys in stack
  const stack = [0];
  let count = 1;

  visited[0] = true;

  // while keys available
  while (stack.length) {
    // get next key from stack
    const key = stack.pop();
    // for each key from room
    for (const newKey of rooms[key]) {
      // set room visited and add key to stack
      if (!visited[newKey]) {
        visited[newKey] = true;
        stack.push(newKey);
        count++;
      }
    }
  }

  // return whether all rooms have been visited
  return rooms.length === count;
};

// Time: O(n + e) where n is number of rooms and e is number of keys
// Space: O(n) to store stack and visited
