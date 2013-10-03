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
  //var solutionCount = undefined; //fixme
  //for (var i=0; )
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  //return solutionCount;
};


window.translateToMajorDiagIndex = function(rowIndex,colIndex) {
  var col = colIndex;
  for (var t = rowIndex - 1; t >= 0; t--) {
    col--;
  }
  return col;
};

window.translateToMinorDiagIndex = function(rowIndex,colIndex) {
  var col = colIndex;
  for (var t = rowIndex - 1; t >= 0; t--) {
    col++;
  }
  return col;
};

window.getSquaresInRemainingMajorDiag = function(rowIndex,colIndex) {
  var results = [];
  var col = colIndex + 1;
  for (var t = rowIndex + 1; t < this.get('n'); t++) {
    results.push([t, col]);
    col++;
  }
  return results;
};

window.extend = function(destination, origin) {
  for (var key in origin) {
    if (!(Array.isArray(origin[key]))) {
      destination[key] = origin[key];
    }
  }
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){

  //var solution = undefined; //fixme

  //console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  if (n === 0) {
    return 1;
  }
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
  var firstBoard = [];
  var blankRow = function(n) {
    var empty = [];
    for (var q = 0; q < n; q++) {
      empty.push(0);
    }
    return empty;
  };
  for (var z = 0; z < n; z++) {
    firstBoard.push(blankRow(n));
  }
  var recurSearch = function(board, curRow) {
    // for each column in the current row
    for (var y = 0; y < n; y++) {
      // if there's an available space
      if (board[curRow][y] !== null) {
        // if we're in the last row, we know we've found a valid solution, so we increment the solutionCount and we're done
        if (curRow === n - 1 ) {
          solutionCount +=1;
        // otherwise we put a queen down and recursively search the next row
        } else {
          // create a deep copy of the current board
          var boardCopy = [];
          for (var e = 0; e < n; e++) {
            boardCopy.push(board[e].slice());
            // debugger;
          }
          extend(boardCopy, board); // extend board's methods to boardCopy
          // now set a queen down in the available space
          boardCopy[curRow][y] = 1;
          // console.log(boardCopy);
          // set the newly implied dead space
          // in the column where we just added the queen
          for (var c = curRow + 1; c < n; c++) {
            boardCopy[c][y] = null;
          }
          // in the major diagonal where we just added the queen
          var col = y + 1;
          for (var t = curRow + 1; t < n; t++) {
            if (col <= n - 1) {
              boardCopy[t][col] = null;
              col++;
            }
          }
          // in the minor diagonal where we just added the queen
          col = y - 1;
          for (t = curRow + 1; t < n; t++) {
            if (col >= 0) {
              boardCopy[t][col] = null;
              col--;
            }
          }
          // console.log(boardCopy);
          // call recurSearch on the next row
          recurSearch(boardCopy, curRow+1);

        }
      }
    }
    // if we got through all columns in the row without adding a queen, we're done; the current board is not a solution
    return;
  };
  recurSearch(firstBoard, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};





// !matrix.hasColConflictAt(y) && !matrix.hasMajorDiagonalConflictAt(translateToMajorDiagIndex(row,y)) && !matrix.hasMinorDiagonalConflictAt(translateToMinorDiagIndex(row,y))
