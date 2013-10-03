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
  // code copied from .countNQueensSolutions, deleted the lines which set nulls in major and minor diagonals
  if (n === 0) {
    return 1;
  }

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
        // otherwise we put a rook down and recursively search the next row
        } else {
          // create a deep copy of the current board
          var boardCopy = [];
          for (var e = 0; e < n; e++) {
            boardCopy.push(board[e].slice());
          }
          // now set a queen down in the available space
          boardCopy[curRow][y] = 1;
          // set the newly implied dead space
          // in the column where we just added the rook
          for (var c = curRow + 1; c < n; c++) {
            boardCopy[c][y] = null;
          }
          // call recurSearch on the next row
          recurSearch(boardCopy, curRow+1);
        }
      }
    }
    return;
  };
  recurSearch(firstBoard, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n){
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
          // put a queen down
          board[curRow][y] = 1;
          // convert nulls back to 0's to pass the test
          for (var w = 0; w < n; w++) {
            for (var v = 0; v < n; v++) {
              if (board[w][v] === null) {
                board[w][v] = 0;
              }
            }
          }
          // create a slimmed down copy of 
          return board;
        // otherwise we put a queen down and recursively search the next row
        } else {
          // create a deep copy of the current board
          var boardCopy = [];
          for (var e = 0; e < n; e++) {
            boardCopy.push(board[e].slice());
          }
          // now set a queen down in the available space
          boardCopy[curRow][y] = 1;
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
          // call recurSearch on the next row
          recurSearch(boardCopy, curRow+1);
        }
      }
    }
  };
  return recurSearch(firstBoard, 0);
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n){
  if (n === 0) {
    return 1;
  }

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
          }
          // now set a queen down in the available space
          boardCopy[curRow][y] = 1;
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
          // call recurSearch on the next row
          recurSearch(boardCopy, curRow+1);

        }
      }
    }
    return;
  };
  recurSearch(firstBoard, 0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};





// !matrix.hasColConflictAt(y) && !matrix.hasMajorDiagonalConflictAt(translateToMajorDiagIndex(row,y)) && !matrix.hasMinorDiagonalConflictAt(translateToMinorDiagIndex(row,y))
