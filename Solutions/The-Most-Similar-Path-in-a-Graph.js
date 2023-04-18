/**
Solution: DFS + Memoization
 */
var mostSimilar = function (n, roads, names, targetPath) {
  const map = {};
  for (let i = 0; i < n; i++) map[i] = [];
  for (let [a, b] of roads) {
    // O(n)
    map[a].push(b);
    map[b].push(a);
  }

  let res;
  let min = Infinity;
  const memo = [...new Array(names.length)].map(
    () => new Array(targetPath.length)
  );
  for (let i = 0; i < names.length; i++) {
    // O(n)
    const temp = dfs(i, 0);
    if (min > temp.dist) {
      min = temp.dist;
      res = temp;
    }
  }
  return res.path;

  function dfs(currentLocation, index) {
    // O(n^2)
    if (memo[currentLocation][index] !== undefined)
      return memo[currentLocation][index];

    let destinations = map[currentLocation];
    if (index === targetPath.length - 1) {
      let dist = 0;
      if (names[currentLocation] !== targetPath[index]) {
        dist++;
      }
      return { dist, path: [currentLocation] };
    }

    let m = Infinity;
    let smallest;
    for (let i = 0; i < destinations.length; i++) {
      const temp = dfs(destinations[i], index + 1);
      if (temp.dist < m) {
        m = temp.dist;
        smallest = temp;
      }
    }

    let d = 0;
    if (names[currentLocation] !== targetPath[index]) {
      d++;
    }
    return (memo[currentLocation][index] = {
      dist: smallest.dist + d,
      path: [currentLocation, ...smallest.path],
    });
  }
};
// TC: O(n^2)
