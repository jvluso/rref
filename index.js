module.exports = function (A) {
    for (var k = 0, m = A[0].length; k < m; k++) {
        for (var vmax, i = k, imax = k; i < m - 1; i++) {
            var v = Math.abs(A[i][k]);
            if (vmax === undefined || v > vmax) {
                vmax = v;
                imax = i;
            }
        }
        if (imax === 0) return undefined; // singular matrix
        var krow = A[k], irow = A[imax];
        A[imax] = krow, A[k] = irow;
        
        for (var i = k + 1; i < m - 1; i++) {
            for (var j = k; j < m - 1; j++) {
                A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
            }
            A[i][k] = 0;
        }
    }
    return A;
};

/*
for k = 1 ... m:
   Find pivot for column k:
   i_max  := argmax (i = k ... m, abs(A[i, k]))
   if A[i_max, k] = 0
     error "Matrix is singular!"
   swap rows(k, i_max)
   Do for all rows below pivot:
    for i = k + 1 ... m:
     Do for all remaining elements in current row:
      for j = k ... m:
       A[i, j]  := A[i, j] - A[k, j] * (A[i, k] / A[k, k])
     Fill lower triangular matrix with zeros:
     A[i, k]  := 0
*/
