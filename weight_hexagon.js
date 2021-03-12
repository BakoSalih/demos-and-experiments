<<<<<<< HEAD
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


export function gap(W,A,B,C,m,x=0,y=0,type=1,n) {
  const height = W.length;
  if (m > 0) {
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
  // else if (type == 4 && A*B*C>=8) {
  //     const ypos = centery;
  //     const xpos = centerx;
  //
  //     W[ypos+1][xpos-2] = 0;
  //
  //     W[ypos-1][xpos-1] = 0;
  //     W[ypos][xpos-1] = 1;
  //     W[ypos+1][xpos-1] = 0;
  //     W[ypos+2][xpos-1] = 0;
  //     W.holes[ypos][xpos-1] = 1;
  //
  //     for (let x = 0; x < m; x++) {
  //       const xpos = centerx+2*x;
  //
  //       W[ypos-1][xpos] = 0;
  //       W[ypos+1][xpos] = 1;
  //
  //       W[ypos-2][xpos+1] = 0;
  //       W[ypos-1][xpos+1] = 1;
  //       W[ypos][xpos+1] = 0;
  //       W[ypos+1][xpos+1] = 0;
  //
  //       // add hole to W.holes
  //       W.holes[ypos+1][xpos] = 1;
  //       W.holes[ypos-1][xpos+1] = 1;
  //     }
  //
  //
  //     W[ypos-1][xpos+2] = 0;
  // }

  }
  return W
}
=======
export function weight_hexagon(e,t,o,r){const l=2*(t+o+r-1);for(var f=[],n=0;n<l;n++)f[n]=[],f[n].length=l,f[n].fill(0);const s=e.length,i=e[0].length;for(var h=0;h<l;h++)for(var c=0;c<l;c++)if(g(h,c))if(h%2==0){const t=h/2;f[l-1-c][h]=e[s-1-c%s][t%i]}else c%2==0&&(f[l-1-c][h]=1);else a=c,h>=2*(o+r)-1&&a>=2*(t+r)-1&&u(h,c)?f[l-1-c][h]=1:u(h,c)&&(c+h)%2==1&&(f[l-1-c][h]=1);var a;return f;function u(e,t){var o=!1;const r=l-1-t;return 0==e&&0==t?o=!0:0==e&&t>0?o=0==f[r+1][e]:e>0&&0==t?o=(e+t)%2==1?0==f[r][e-1]:0==f[r][e-1]&&0==f[r-1][e-1]:e>0&&t==l-1?o=(e+t)%2==1?0==f[r][e-1]&&0==f[r+1][e-1]&&0==f[r+1][e]:0==f[r][e-1]&&0==f[r+1][e]:e>0&&t>0&&t<l-1&&(o=(e+t)%2==1?0==f[r][e-1]&&0==f[r+1][e-1]&&0==f[r+1][e]:0==f[r][e-1]&&0==f[r-1][e-1]&&0==f[r+1][e]),o}function g(e,l){var f=!1;return e<2*Math.min(o,r)?f=l>=0&&l<2*t+e:e>=2*r&&e<2*o?f=l>=0&&l<2*(t+r)-1:e>=2*o&&e<2*r?f=l>=e-2*o+1&&l<2*t+e:e>=2*Math.max(o,r)&&e<2*(o+r)-1&&(f=l>=e-2*o+1&&l<2*(t+r)-1),f}}export function gap(e,t,o,r,l,f=0,n=0,s=1,i){const h=e.length;if(l>0){const c=o+r-1+2*f,a=h-(t+r)-2*n-f;if(1==s)for(let t=0;t<i;t++)for(let o=0;o<l;o++){const r=a-1-2*t,l=c+1+2*o;e[r][l]=1,e[r+1][l]=0,e[r-1][l]=0,e[r][l+1]=0,e[r][l-1]=0,e.holes[r][l]=1}else if(2==s)for(let t=0;t<i;t++)for(let o=0;o<l;o++){const r=a-1-2*t,l=c+2*(o+t)+2;e[r][l]=1,e[r][l-1]=0,e[r][l+1]=0,e[r+1][l+1]=0,e[r-1][l-1]=0,e.holes[r][l]=1}else if(3==s)for(let t=0;t<i;t++)for(let o=0;o<l;o++){const r=a-2*(t+o)-2,l=c+1+2*o;e[r][l]=1,e[r-1][l]=0,e[r-1][l+1]=0,e[r+1][l]=0,e[r+1][l-1]=0,e.holes[r][l]=1}if(4==s)for(let t=-2*l;t<=2*l;t++)for(let o=-4*l;o<=4*l;o++)o>=-2*l+t&&o<=2*l+t&&(e[a-t][c+o]=0,e.holes[a-t][c+o]=1);else if(5==s)for(let t=-2*l;t<=2*l;t++)for(let o=-2*l;o<=2*l;o++)e[a-t][c+o]=0,e.holes[a-t][c+o]=1;else if(6==s)for(let t=-2*l;t<=2*l;t++)for(let o=-4*l;o<=4*l;o++)o>=-2*l+t&&o<=2*l+t&&(e[a-o][c+t]=0,e.holes[a-o][c+t]=1)}return e}
>>>>>>> e9392a00776fa72d2259db648556cb5d9724874f
