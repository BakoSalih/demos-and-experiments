export function weight_hexagon(w,A,B,C) {

// make zero-filled array W
const N = 2*(A+B+C-1);
var W = [];
for (var i=0; i<N; i++) {
  W[i] = [];
  W[i].length = N;
  W[i].fill(0);
}

// const W = [];
// for (let i=0; i<N; i++) {
//   W[i] = new Float32Array(N);
//   //W_im[i].length = n;
//   //W_im[i].fill(0);
// }


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
          const k = x/2;
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
  return boolean;
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

    return boolean;
}

// isinUpRightCorner(x3,y3) return true if (x3,y3) is in the top right
// corner outside the hexagon.
// return false otherwise
function isinUpRightCorner(x3,y3) {
    return (x3 >= 2*(B+C)-1 && y3 >= 2*(A+C)-1);
}
}


export function weight_aztec(w, A) {

// make zero-filled array W
const N = 2*A;
var W = [];
for (var i=0; i<N; i++) {
  W[i] = [];
  W[i].length = N;
  W[i].fill(0);
}

// const W = [];
// for (let i=0; i<N; i++) {
//   W[i] = new Float32Array(N);
//   //W_im[i].length = n;
//   //W_im[i].fill(0);
// }


// get dimensions
const Ly = w.length;
const Lx = w[0].length;

// populate W
for (var x = 0; x <N; x=x+1) {
  for (var y = 0; y<N; y=y+1) {
      W[N-1-y][x] = w[Ly - 1 - (y % Ly)][x % Lx];
      // const a11 = w[Ly - 1 - ((y+1) % Ly)][x % Lx];
      // const a12 = w[Ly - 1 - ((y+1) % Ly)][(x+1) % Lx];
      // const a21 = w[Ly - 1 - (y % Ly)][x % Lx];
      // const a22 = w[Ly - 1 - (y % Ly)][(x+1) % Lx];
      // W[N-1-y][x] = a12*a22;
      // W[N-1-y][x+1] = a21*a22;
      // W[N-2-y][x] = a11*a21;
      // W[N-2-y][x+1] = a11*a12;
  }
}
return W


}

// export function gap2(W,A,B,C,m,x=0,y=0,type=1,n=0) {
//   const height = W.length;
//
//   if (m > 0) {
//   const centerx = (B+C)-1 + 2*x;
//   const centery = height - (A+C) - 2*y - x;
//
//     // if (type == 4) {
//     //   for (let y = 0; y <= m; y++) {
//     //    for (let x = -2*m; x <= 2*m; x++) {
//     //     if (x >= y && x <= m+y) {
//     //       // if (y % 2 == 0) {
//     //       //   // remove weights from hole
//     //       //   W[centery - y][centerx + x] = 0;
//     //       // } else {
//     //       //   // remove weights from hole
//     //       //   W[centery - y][centerx + x] = 0;
//     //       // }
//     //       // remove weights from hole
//     //       W[centery - y][centerx + x] = 0;
//     //       // add hole to W.holes
//     //       W.holes[centery - y][centerx + x] = 1;
//     //       }
//     //     }
//     //   }
//     if (type == 1) {
//       for (let y = -m; y <= m; y++) {
//        for (let x = -2*m; x <= 2*m; x++) {
//         if (x >= -m+y && x <= m+y) {
//           // if (y % 2 == 0) {
//           //   // remove weights from hole
//           //   W[centery - y][centerx + x] = 0;
//           // } else {
//           //   // remove weights from hole
//           //   W[centery - y][centerx + x] = 0;
//           // }
//           // remove weights from hole
//           W[centery - y][centerx + x] = 0;
//           // add hole to W.holes
//           W.holes[centery - y][centerx + x] = 1;
//           }
//         }
//       }
//     } else if (type == 2) {
//       for (let y = -m; y <= m; y++) {
//        for (let x = -m; x <= m; x++) {
//           W[centery - y][centerx + x] = 0;
//           // add hole to W.holes
//           W.holes[centery - y][centerx + x] = 1;
//         }
//       }
//     } else if (type == 3) {
//       for (let x = -m; x <= m; x++) {
//        for (let y = -2*m; y <= 2*m; y++) {
//         if (y >= -m+x && y <= m+x) {
//           W[centery - y][centerx + x] = 0;
//           // add hole to W.holes
//           W.holes[centery - y][centerx + x] = 1;
//           }
//         }
//       }
//     }
//   } if (type == 4) {
//       for (let y = 0; y < n; y++) {
//       for (let x = 0; x < m; x++) {
//         const ypos = centery-1-2*y;
//         const xpos = centerx+1+2*x;
//         W[ypos][xpos] = 1;
//         W[ypos+1][xpos] = 0;
//         W[ypos-1][xpos] = 0;
//         W[ypos][xpos+1] = 0;
//         W[ypos][xpos-1] = 0;
//         // add hole to W.holes
//         W.holes[ypos][xpos] = 1;
//       }
//       }
//   } else if (type == 5) {
//       for (let y = 0; y < n; y++) {
//       for (let x = 0; x < m; x++) {
//         const ypos = centery-1-2*y;
//         const xpos = centerx+2*(x+y)+2;
//         W[ypos][xpos] = 1;
//         W[ypos][xpos-1] = 0;
//         W[ypos][xpos+1] = 0;
//         W[ypos+1][xpos+1] = 0;
//         W[ypos-1][xpos-1] = 0;
//         // add hole to W.holes
//         W.holes[ypos][xpos] = 1;
//       }
//       }
//   } if (type == 6) {
//       for (let y = 0; y < n; y++) {
//       for (let x = 0; x < m; x++) {
//         const ypos = centery-2*(y+x)-2;
//         const xpos = centerx+1+2*x;
//         W[ypos][xpos] = 1;
//         W[ypos-1][xpos] = 0;
//         W[ypos-1][xpos+1] = 0;
//         W[ypos+1][xpos] = 0;
//         W[ypos+1][xpos-1] = 0;
//         // add hole to W.holes
//         W.holes[ypos][xpos] = 1;
//       }
//       }
//   }
//
//   //W.holes = holes;
//   return W
//
// }

// export function gap(W,A,B,C,m,xc=0,yc=0,type=1,n) {
//   const height = W.length;
//   if (m > 0) {
//   //const centerx = (B+C)-1 + 2*x;
//   const centerx = (B+C)-1 + xc + yc;
//   //const centery = height - (A+C) - 2*y - x;
//   const centery = height - (A+C) - yc;
//   if (type == 1) {
//       for (let y = 0; y < n; y++) {
//       for (let x = 0; x < m; x++) {
//         const ypos = centery-1-2*y;
//         const xpos = centerx+1+2*x;
//         W[ypos][xpos] = 1;
//         W[ypos+1][xpos] = 0;
//         W[ypos-1][xpos] = 0;
//         W[ypos][xpos+1] = 0;
//         W[ypos][xpos-1] = 0;
//         // add hole to W.holes
//         W.holes[ypos][xpos] = 1;
//       }
//       }
//   } else if (type == 2) {
//       for (let y = 0; y < n; y++) {
//       for (let x = 0; x < m; x++) {
//         const ypos = centery-1-2*y;
//         const xpos = centerx+2*(x+y)+2;
//         W[ypos][xpos] = 1;
//         W[ypos][xpos-1] = 0;
//         W[ypos][xpos+1] = 0;
//         W[ypos+1][xpos+1] = 0;
//         W[ypos-1][xpos-1] = 0;
//         // add hole to W.holes
//         W.holes[ypos][xpos] = 1;
//       }
//       }
//   } else if (type == 3) {
//       for (let y = 0; y < n; y++) {
//       for (let x = 0; x < m; x++) {
//         const ypos = centery-2*(y+x)-2;
//         const xpos = centerx+1+2*x;
//         W[ypos][xpos] = 1;
//         W[ypos-1][xpos] = 0;
//         W[ypos-1][xpos+1] = 0;
//         W[ypos+1][xpos] = 0;
//         W[ypos+1][xpos-1] = 0;
//         // add hole to W.holes
//         W.holes[ypos][xpos] = 1;
//       }
//       }
//   } else if (type == 4 && A*B*C>=8) {
//         const ypos = centery;
//         const xpos = centerx;
//
//         W[ypos+1][xpos-2] = 0;
//
//         W[ypos-1][xpos-1] = 0;
//         W[ypos][xpos-1] = 1;
//         W[ypos+1][xpos-1] = 0;
//         W[ypos+2][xpos-1] = 0;
//         W.holes[ypos][xpos-1] = 1;
//
//         for (let x = 0; x < m; x++) {
//           const xpos = centerx+2*x;
//
//           W[ypos-1][xpos] = 0;
//           W[ypos+1][xpos] = 1;
//
//           W[ypos-2][xpos+1] = 0;
//           W[ypos-1][xpos+1] = 1;
//           W[ypos][xpos+1] = 0;
//           W[ypos+1][xpos+1] = 0;
//
//           // add hole to W.holes
//           W.holes[ypos+1][xpos] = 1;
//           W.holes[ypos-1][xpos+1] = 1;
//         }
//
//
//         W[ypos-1][xpos+2] = 0;
//     }
//
//   }
//   return W
// }



export function gap(W,A,B,C,m,x=0,y=0,type=1,n,Shape) {
  const height = W.length;
  if (m > 0 && Shape.shape.name == "hexagon") {
  const centerx = (B+C)-1 + 2*x;
  const centery = height - (A+C) - 2*y - x;
  if (type == 1) {
      for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const ypos = centery-1-2*y;
        const xpos = centerx+1+2*x;
        W[ypos][xpos] = 1;
        W[ypos+1][xpos] = 0;
        W[ypos-1][xpos] = 0;
        W[ypos][xpos+1] = 0;
        W[ypos][xpos-1] = 0;
        // add hole to W.holes
        W.holes[ypos][xpos] = 1;
      }
      }
  } else if (type == 2) {
      for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const ypos = centery-1-2*y;
        const xpos = centerx+2*(x+y)+2;
        W[ypos][xpos] = 1;
        W[ypos][xpos-1] = 0;
        W[ypos][xpos+1] = 0;
        W[ypos+1][xpos+1] = 0;
        W[ypos-1][xpos-1] = 0;
        // add hole to W.holes
        W.holes[ypos][xpos] = 1;
      }
      }
  } else if (type == 3) {
      for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        const ypos = centery-2*(y+x)-2;
        const xpos = centerx+1+2*x;
        W[ypos][xpos] = 1;
        W[ypos-1][xpos] = 0;
        W[ypos-1][xpos+1] = 0;
        W[ypos+1][xpos] = 0;
        W[ypos+1][xpos-1] = 0;
        // add hole to W.holes
        W.holes[ypos][xpos] = 1;
      }
      }
  } if (type == 4) {
        for (let y = -2*m; y <= 2*m; y++) {
         for (let x = -2*2*m; x <= 2*2*m; x++) {
          if (x >= -2*m+y && x <= 2*m+y) {
            // re2*move weights fro2*m hole
            W[centery - y][centerx + x] = 0;
            // add hole to W.holes
            W.holes[centery - y][centerx + x] = 1;
            }
          }
        }
      } else if (type == 5) {
        for (let y = -2*m; y <= 2*m; y++) {
         for (let x = -2*m; x <= 2*m; x++) {
            W[centery - y][centerx + x] = 0;
            // add hole to W.holes
            W.holes[centery - y][centerx + x] = 1;
          }
        }
      } else if (type == 6) {
        for (let x = -2*m; x <= 2*m; x++) {
         for (let y = -2*2*m; y <= 2*2*m; y++) {
          if (y >= -2*m+x && y <= 2*m+x) {
            W[centery - y][centerx + x] = 0;
            // add hole to W.holes
            W.holes[centery - y][centerx + x] = 1;
            }
          }
        }
      }
  } else if (m > 0 && Shape.shape.name == "aztec") {
      if (type == 1) {
        // hack: Math.floor(./2)*2 to make things even
        const centerx = A-2 + Math.floor(x/2)*2 ;
        const centery = height - A-1  - Math.floor(y/2)*2;
        m = Math.floor(m/2)*2;
        for (let y = -m-1; y < m+1; y++) {
         for (let x = -m-1; x < m+1; x++) {
            // // re2*move weights fro2*m hole
            if ((centery - y+centerx + x) % 2 == 0 || x == -m-1 || y == -m-1 || x == m || y == m ) {
              W[centery - y][centerx + x] = 0;
            } else {
              W[centery - y][centerx + x] = 1;
            }
            //W[centery - y][centerx + x] = 0;
            // add hole to W.holes
            W.holes[centery - y][centerx + x] = 1;
            }
          }
        }
    } else if (m > 0 && Shape.shape.name == "fortress") {
      m = Math.floor(m/2);
      for (let j = Math.floor(A/2 - m + 2*x); j < Math.floor(A/2 + m + 2*x); j++) {
        for (let i = Math.floor(A/2 - m + 2*y); i< Math.floor(A/2 + m + 2*y); i++) {
            // +2 as it is centered
            let xcord = 3*j + i + Shape.temp_padding;
            let ycord = W.length -1- (j+ 3*i + Shape.temp_padding);

            // Hole
            W[ycord][xcord] = 1;
            W[ycord+1][xcord-1] = 1;
            W[ycord+1][xcord] = 1;
            W[ycord][xcord-1] = 1;
            W.holes[ycord][xcord] = 1;
            W.holes[ycord+1][xcord-1] = 1;
            W.holes[ycord+1][xcord] = 1;
            W.holes[ycord][xcord-1] = 1;

            // remove adjacent edges
            W[ycord-1][xcord-1] = 0;
            W[ycord-1][xcord] = 0;
            W[ycord][xcord-2] = 0;
            W[ycord][xcord+1] = 0;
            W[ycord+1][xcord-2] = 0;
            W[ycord+1][xcord+1] = 0;
            W[ycord+2][xcord-1] = 0;
            W[ycord+2][xcord] = 0;


        }
      }
  }
  return W
}
