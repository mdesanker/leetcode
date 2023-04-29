/**
 * @param {ArrayReader} reader
 * @return {number}
 */
var guessMajority = function (reader) {
  const n = reader.length();
  let cntEqual = 1,
    cntDiffer = 0;
  let indexDiffer = -1;

  function helper(equal, i) {
    if (equal) cntEqual++;
    else {
      cntDiffer++;
      indexDiffer = i;
    }
  }

  let query0123 = reader.query(0, 1, 2, 3);
  let query1234 = reader.query(1, 2, 3, 4);

  helper(reader.query(1, 2, 3, 4) === query0123, 4);

  for (let i = 5; i < n; i++) {
    helper(reader.query(1, 2, 3, i) === query0123, i);
  }
  helper(reader.query(0, 2, 3, 4) === query1234, 1);
  helper(reader.query(0, 1, 3, 4) === query1234, 2);
  helper(reader.query(0, 1, 2, 4) === query1234, 3);

  if (cntEqual > cntDiffer) return 0;
  else if (cntDiffer > cntEqual) return indexDiffer;
  else return -1;
};
// TC: O(n)
// SC: O(1)
