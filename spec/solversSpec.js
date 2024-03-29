describe("solvers", function() {
  window.displayBoard = function(){};

  describe('findNRooksSolution()', function(){

    it('finds a valid solution for n of 0-8', function(){
      _.range(1, 8).map(function(n){
        var solutionBoard = new Board(findNRooksSolution(n));
        expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function(){

    it('finds the number of valid solutions for n of 0-8', function(){
      _.range(0, 8).map(function(n){
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function(){

    it('finds a valid solution for n of 0-8', function(){
      _.range(1, 8).map(function(n){
        var solutionBoard = new Board(findNQueensSolution(n));
        //expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNQueensSolutions()', function(){

    it('finds the number of valid solutions for n of 0-12', function(){
      _.range(0, 12).map(function(n){
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92,352,724,2680,14200][n];
        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('count Queens solutions for 12', function(){

    it('finds the number of valid solutions for n = 12', function(){
      var solutionCount = countNQueensSolutions(12);
      var expectedSolutionCount = 14200;
      expect(solutionCount).to.be.equal(expectedSolutionCount);
    });

  });

  //   describe('count Queens solutions for 15', function(){

  //   it('finds the number of valid solutions for n = 15', function(){
  //     var solutionCount = countNQueensSolutions(15);
  //     var expectedSolutionCount = 2279184;
  //     expect(solutionCount).to.be.equal(expectedSolutionCount);
  //   });

  // });

});
