/*           _                    
   ___  ___ | |_   _____ _ __ ___ 
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n){

  var solution = [];
  for (var i=0; i<n; i++) {
    var row = [];
    for (var j=0; j<n; j++) {
      if (j === i) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    solution.push(row);
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n){
  var solutionCount = undefined; //fixme
  for (var i=0; )
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


window.translateToMajorDiagIndex = function(rowIndex,colIndex) {

};

window.translateToMinorDiagIndex = function(rowIndex,colIndex) {

};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){

  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  // one blank nxn board
  // pass board to an iterator
  // iterator will place a queen at each possible spot on board (checking for conflicts, which will at this point be none),
  // and will recursively call itself with the modified board (queen at 0,0)
  // -with our first board, which has a queen in [0,0], we go to the second row, and 
  // iterate over the second row of the modified board.  We check each space in the row
  // that it is 0 (not null, which indicates dead space, set at the last time we placed a queen) and then if there are no
  // column or diagonal conflicts on our check, set 1. Null out all remaining squares with the same column index
  // and in the same diagonal, and repeat until there are no more rows.
  // When there are no more rows to go through, check if the number of queens === n, or if we successfully placed a queen in the row


  // if n is even, for row 0 don't bother checking boards for dot at [0,0].  Start at index 1.  (True up to n =20)
  var solutionCount = 0;
  var board = new Board({'n': n});
  var recurSearch = function(board, curRow) {
    var queenAdded = false;
    for (var y = 0; y < board.get('n'); y++) {
      // if there's an available space
      if (board.get(curRow)[y] !== null) {
        // create a deep copy of the current board
        var boardCopy = [];
        for (var e = 0; e < board.get('n'); e++) {
          boardCopy.push(board.get(e).slice());
        }
        extend board methods
        // now set a queen down in the available space
        boardCopy.get(curRow)[y] = 1;
        queenAdded = true;
        // set the newly implied dead space
        for (var c = row + 1; c < board.get('n'); c++) {
          board.get(row)[y] = null;
        }
        // call recurSearch on the next row
        recurSearch(boardCopy, curRow+1);
      }
    }
    // if we got through all columns in the row without adding a queen, we're done; the current board is not a solution
    if (!queenAdded) { return; }
    // if we are in the last row at this point, then we must have found a valid solution
    if (curRow === 'n' - 1 ) { solutionCount +=1; }
    return;
  };
  recurSearch(board);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};





// !matrix.hasColConflictAt(y) && !matrix.hasMajorDiagonalConflictAt(translateToMajorDiagIndex(row,y)) && !matrix.hasMinorDiagonalConflictAt(translateToMinorDiagIndex(row,y))
