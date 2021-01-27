function W_split(W) {
  const n = W.length;
  const W_im = [];
  for (var i=0; i<n; i++) {
    W_im[i] = [];
    W_im[i].length = n;
    W_im[i].fill(0)
  }

  for (var i=0; i<n; i++) {
     for (var j=0; j<n; j++) {
         if (W[i][j] == 0) {
         W_im[i][j] = 1;
         W[i][j] = 1;
        }
     }
  }

  W.im = W_im;
  return W
}

function Matching(P,n) {
  // create empty (n+2)x(n+2) matrix M. We pad by 1 to simplify algorithm
  // at corners. The padding is then stripped away at the end
  const M = [];
  for (i=0; i<n+2; i++) {
    M[i] = new Uint8Array(n+2);
    M[i].fill(false);
  }

  const m = n/2;
  let k = 0;
  for (var i = 0; i<=m; i++) {
    // store 'active' cells that need to be filled in the creation step
    var Mcells = [];
    // the destruction step (+ tracking cells to fill)
    for (var y=m-i+1; y<=m+i-1; y += 2) {
        for (var x=m-i+1; x<=m+i-1; x += 2) {
            // k keeps track of which weight is associated with
            // edge (y,x) at any step. Note: k is not reset at loop end
            k = k+1;
            const nonzeros = M[x][y] + M[x+1][y] + M[x][y+1] + M[x+1][y+1];
            // save the locations mcells to fill in next step
            // note we can only have 0, 1 or 2 edges in each cell
            switch (nonzeros) {
                case 1: // slide if only 1 edge
                    const temp = M[x][y];
                    M[x][y] = M[x+1][y+1];
                    M[x+1][y+1] = temp;

                    const temp2 = M[x+1][y];
                    M[x+1][y] = M[x][y+1];
                    M[x][y+1] = temp2;
                    break;
                case 2: // destroy if 2 edges
                    M[x][y] = false;
                    M[x+1][y] = false;
                    M[x][y+1] = false;
                    M[x+1][y+1] = false;
                    // store active cell
                    Mcells.push([y,x,k]);
                    break;
                case 0:
                    // store active cell
                    Mcells.push([y,x,k]);
                    break;
              }
        }
    }

    // the creation step, fill using Mcells
    for (var r=0; r<Mcells.length; r++) {
        // get location (y,x)
        const y = Mcells[r][0];
        const x = Mcells[r][1];
        // check if cells below/to the left have been filled
        // note: creation step depends on order of filling
        if (!(M[x-1][y] || M[x+2][y] || M[x][y-1] || M[x+1][y-1])) {
            // randomly assign according to weight calculated in P
            const bool = Math.random() < P[P.length-Mcells[r][2]];
            // create new edges
            if (bool) {
                M[x][y] = true;
                M[x+1][y+1] = true;
            } else {
                M[x+1][y] = true;
                M[x][y+1] = true;
            }
        }
    }

  }
  // strip away the padding and invert in y-axis
  const Mnew = [];
  for (i=n; i>=1; i--) {
    const Mrow = new Uint8Array(n);
    for (var j=1; j<=n; j++) {
      Mrow[j-1] = M[i][j];
    }
    Mnew.push(Mrow);
  }
  return Mnew;
}

function Reduction(W_real, W_im) {
  const n = W_real.length;
  const m = n/2;
  const P = [];

  for (var i=0; i<=m-1; i++) {
    // iterate from lower, right corner up and to the left
    // this is to produce P in a sequence that
    // can be simply iterated over in the matching step
    // else Pm_11 ... Pm_nn | ... | P2_11 P2_21 P2_12 P2_22 | P1_11
    // instead of more easily Pm_11 ... Pm_nn | ... | P2_22 P2_12 P2_21 P2_11 | P1_11
    for (var y=n-2*i-2; y>=0; y -= 2) {
      for (var x=n-2*i-2; x>=0; x -= 2) {
        const R1 = W_real[x+i][y+i];
        const R2 = W_real[x+1+i][y+i];
        const R3 = W_real[x+i][y+1+i];
        const R4 = W_real[x+1+i][y+1+i];

        const I1 = W_im[x+i][y+i];
        const I2 = W_im[x+1+i][y+i];
        const I3 = W_im[x+i][y+1+i];
        const I4 = W_im[x+1+i][y+1+i];

        var b = I1 + I4;
        const b23 = I2 + I3;
        var D = 1;
        if (b23 > b) {
          D = R1 * R4;
          P.push(1);
        } else if (b == b23) {
          D = R1 * R4 + R2 * R3;
          P.push(R1 * R4 / D);
        } else {
          b = b23;
          D = R2 * R3;
          P.push(0);
        }

        W_im[x+i][y+i] = I4 - b;
        W_im[x+1+i][y+i] = I3 - b;
        W_im[x+i][y+1+i] = I2 - b;
        W_im[x+1+i][y+1+i] = I1 - b;

        W_real[x+i][y+i] = R4 / D;
        W_real[x+1+i][y+i] = R3 / D;
        W_real[x+i][y+1+i] = R2 / D;
        W_real[x+1+i][y+1+i] = R1 / D;
      }
    }
  }

  return P;
}

function gap(W,A,B,m) {
  // not sure how this works anymore
  const height = W.length;
  const holes = [];
  for (var i=0; i<height; i++) {
    holes[i] = [];
    holes[i].length = height;
    holes[i].fill(0)
  }

  const centerx = 2*(B)-1;
  const centery = height - 2*(A);

  for (var y = -m; y <= m; y++) {
   for (var x = -2*m; x <= 2*m; x++) {
    if (x >= -m+y && x <= m+y) {
      if (y % 2 == 0) {
        holes[centery - y][centerx + x] = 1;
        W[centery - y][centerx + x] = 0;//2*Math.abs(x % 2);
      } else {
        holes[centery - y][centerx + x] = 1;
        W[centery - y][centerx + x] = 0;
      }
      }
    }
  }

  W.holes = holes;
  return W
}

export {W_split, Reduction, Matching, gap};
