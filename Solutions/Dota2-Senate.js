/**
 * @param {string} senate
 * @return {string}
 */
// Two Queues
var predictPartyVictory = function (senate) {
  const radiant = [];
  const dire = [];
  const n = senate.length;
  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") radiant.push(i);
    else dire.push(i);
  }
  while (radiant.length && dire.length) {
    let r = radiant.shift();
    let d = dire.shift();
    r < d ? radiant.push(r + n) : dire.push(d + n);
  }
  return radiant.length ? "Radiant" : "Dire";
};
// TC: O(n)
// SC: O(n)
