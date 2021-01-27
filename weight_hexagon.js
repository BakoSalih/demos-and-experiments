export function weight_hexagon(w,n,a,b,c) {

const A = n*a;
const B = n*b;
const C = n*c;

// make zero-filled array W
const N = 2*(A+B+C-1);
var W = [];
for (var i=0; i<N; i++) {
  W[i] = [];
  W[i].length = N;
  W[i].fill(0)
}

// get dimensions
const Ly = w.length;
const Lx = w[0].length;

// populate W
for (var x = 0; x <N; x++) {
  for (var y = 0; y<N; y++) {
      //inside the hexagon
      if (isinhexagon(x,y)) {
        // if x is even,
        if (x % 2 == 0) {
          // check if correct
          const k = x/2
          W[N-1-y][x] = w[Ly - 1 - (y % Ly)][k % Lx];
        } else {
          if (y % 2 == 0) {
              W[N-1-y][x] = 1;
          }
        }
      } else if (isinUpRightCorner(x,y) && isThereNoNeighbour(x,y)) {
        W[N-1-y][x] = 1;
      } else { // outside the hexagon
        if (isThereNoNeighbour(x,y) && ((y+x) % 2 == 1)) {
            W[N-1-y][x] = 1;
        }
      }
  }
}
return W

// find neighbour
function isThereNoNeighbour(x, y) {
  //N = W.length;
  var boolean = false;
  const x_ind = N-1-y;

  if (x == 0 && y == 0) {
    boolean = true;
  } else if (x == 0 && y > 0) {
    if (W[x_ind+1][x] == 0) {
        boolean = true;
    } else {
        boolean = false;
    }
  } else if (x > 0 && y == 0) {
    if ((x+y) % 2 == 1) {
      if (W[x_ind][x-1] == 0) {
          boolean = true;
      } else {
          boolean = false;
      }
    } else {
      if (W[x_ind][x-1] == 0 && W[x_ind-1][x-1] == 0) {
          boolean = true;
      } else {
          boolean = false;
      }
    }
  } else if (x > 0 && y == N-1) {
    if ((x+y) % 2 == 1) {
      if (W[x_ind][x-1] == 0 && W[x_ind+1][x-1] == 0 && W[x_ind+1][x] == 0) {
          boolean = true;
      } else {
          boolean = false;
      }
    } else {
      if (W[x_ind][x-1] == 0 && W[x_ind+1][x] == 0) {
          boolean = true;
      } else {
          boolean = false;
      }
    }
  } else if (x > 0 && y > 0 && y < N-1) {
    if ((x+y) % 2 == 1) {
      if (W[x_ind][x-1] == 0 && W[x_ind+1][x-1] == 0 && W[x_ind+1][x] == 0) {
          boolean = true;
      } else {
          boolean = false;
      }
    } else {
      if (W[x_ind][x-1] == 0 && W[x_ind-1][x-1] == 0 && W[x_ind+1][x] == 0) {
          boolean = true;
      } else {
          boolean = false;
      }
    }
  }
  return boolean
}

// isinhexagon(x2,y2) return true if (x2,y2) is inside the hexagon.
// return false otherwise
function isinhexagon(x2,y2) {
    var boolean = false;

    if (x2 < 2*Math.min(B,C)) {
        boolean = (y2 >= 0 && y2 < 2*A+x2);
    } else if (x2 >= 2*C && x2 < 2*B) {
        boolean = (y2 >= 0 && y2 < 2*(A+C)-1);
    } else if (x2 >= 2*B && x2 < 2*C) {
        boolean = (y2 >= x2-2*B+1 && y2 < 2*A+x2);
    } else if (x2 >= 2*Math.max(B,C) && x2 < 2*(B+C)-1) {
        boolean = (y2 >= x2-2*B+1 && y2 < 2*(A+C)-1);
    }

    return boolean
}

// isinUpRightCorner(x3,y3) return true if (x3,y3) is in the top right
// corner outside the hexagon.
// return false otherwise
function isinUpRightCorner(x3,y3) {
    return (x3 >= 2*(B+C)-1 && y3 >= 2*(A+C)-1);
}
}
