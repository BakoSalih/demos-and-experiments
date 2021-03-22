
export function octweight(A, Hexagon) {
  // make zero-filled array W
  let h = Hexagon.temp_padding
  const N = 4*(A)+2*h;
  var W = [];
  for (var i=0; i<N; i++) {
    W[i] = [];
    W[i].length = N;
    W[i].fill(0);
  }

  // // get dimensions
  // const Ly = w.length;
  // const Lx = w[0].length;

  // populate W
  for (var x = 0; x <N; x++) {
    for (var y = 0; y<N; y++) {
          W[N-1-y][x] = 1;
    }
  }


  for (var x = 0; x <A; x++) {
    for (var y = 0; y<A; y++) {
        // +2 as it is centered
        let xcord = 3*x + y + h;
        let ycord = N-1- (x + 3*y + h);

        W[ycord][xcord] = 1//2;
        W[ycord-1][xcord+1] = 0//0;
        W[ycord-2][xcord+2] = 0//0;
        W[ycord-3][xcord+3] = 1//3;

        W[ycord-1][xcord] = 1//2;
        W[ycord-2][xcord+1] = 1//0;
        W[ycord-3][xcord+2] = 1//0;

        W[ycord][xcord+1] = 1//0;
        W[ycord-1][xcord+2] = 1//0;
        W[ycord-2][xcord+3] = 1//3;


        // bottom-left, bottom-right
        if (x == 0 && y == 0) {
          W[ycord+1][xcord] = 0;
          W[ycord][xcord-1] = 0;
        }  else if (x == 0 && y % 2 == 1) {
          W[ycord][xcord-1] = 1;
          W[ycord+1][xcord-1] = 1;
          W[ycord+1][xcord-2] = 0;
          W[ycord+2][xcord-2] = 0;
        } else if (x == 0 && y % 2 == 0) {
          W[ycord][xcord-1]   = 0;
          W[ycord+1][xcord-1] = 0;
          W[ycord+2][xcord-2] = 0;
          W[ycord+3][xcord-3] = 0;
        } else if (y == 0 && x % 2 == 1) {
            W[ycord+1][xcord-1] = 1;
            W[ycord+2][xcord-2] = 0;
            W[ycord+1][xcord]   = 1;
            W[ycord+2][xcord-1] = 0;
        } else if (y == 0 && x % 2 == 0) {
            W[ycord+1][xcord]   = 0;
            W[ycord+1][xcord-1] = 0;
            W[ycord+2][xcord-2] = 0;
            W[ycord+3][xcord-3] = 0;
        }

        // top-left, top-right
        if (x == A-1 && y == A-1) {
            let xc = xcord+3;
            let yc = ycord-3;
            W[yc-1][xc] = 0;
            W[yc][xc+1] = 0;
        } else if (y == A-1 && x % 2 == 1) {
            let xc = xcord+3;
            let yc = ycord-3;
            W[yc-1][xc+1] = 1;
            W[yc-1][xc] = 1;
            W[yc-2][xc+2] = 0;
            W[yc-2][xc+1] = 0;
        } else if (y == A-1 && x % 2 == 0) {
            let xc = xcord+3;
            let yc = ycord-3;
            W[yc-1][xc] = 0;
            W[yc-1][xc+1] = 0;
            W[yc-2][xc+2] = 0;
            W[yc-3][xc+3] = 0;
        }  else if (x == A-1 && y % 2 == 1) {
            let xc = xcord+3;
            let yc = ycord-3;
            W[yc][xc+1] = 1;
            W[yc-1][xc+2] = 0;
            W[yc-1][xc+1] = 1;
            W[yc-2][xc+2] = 0;
        } else if (x == A-1 && y % 2 == 0) {
            let xc = xcord+3;
            let yc = ycord-3;
            W[yc][xc+1] = 0;
            W[yc-1][xc+1] = 0;
            W[yc-2][xc+2] = 0;
            W[yc-3][xc+3] = 0;
        }

        //top-left bottom-right corner
         if (x == 0 && y == A-1) {
          W[ycord-1][xcord-1] = 0;
          W[ycord-2][xcord-1] = 0;
          W[ycord-3][xcord-1] = 0;

          W[ycord-3][xcord] = 1;
          W[ycord-2][xcord] = 1;
          W[ycord-3][xcord+1] = 1;

          W[ycord-4][xcord] = 0;
          W[ycord-4][xcord+1] = 0;
          W[ycord-4][xcord+2] = 0;
        } else if (x == A-1 && y == 0) {
          W[ycord+1][xcord] = 0;
          W[ycord+1][xcord+1] = 0;
          W[ycord+1][xcord+2] = 0;
          W[ycord+1][xcord+3] = 0;

          W[ycord][xcord+2] = 1;
          W[ycord][xcord+3] = 1;
          W[ycord-1][xcord+3] = 1;

          W[ycord][xcord+4] = 0;
          W[ycord-1][xcord+4] = 0;
          W[ycord-2][xcord+4] = 0;
          W[ycord-3][xcord+4] = 0;
        }


        // if ((x == 0 && y % 2 == 1) || (y == 0 && x % 2 == 1)) {
        //   W[ycord+1][xcord-1] = 4;
        //   W[ycord+2][xcord-1] = 4;
        // } else if (x == A-1 && y == 0) {
        //   W[ycord+1][xcord-1] = 5;
        //   W[ycord+1][xcord-1] = 5;
        // } else if (x == 0 && y == A-1) {
        //   W[ycord+1][xcord-1] = 6;
        // }
    }
  }

  return W
}


  function getmatched(M,A) {

    // make zero-filled array W
    const N = 4*(A+1)+2;
    const M0 = [];
    for (var x = 0; x <A; x++) {
      for (var y = 0; y<A; y++) {
          // +2 as it is centered
          let xcord = 3*x + y + 3;
          let ycord = N-1- (x + 3*y + 3);

          let u = [[M[ycord-1][xcord],
          M[ycord-2][xcord+1],
          M[ycord-3][xcord+2]],[M[ycord][xcord],
          M[ycord-1][xcord+1],
          M[ycord-2][xcord+2],
          M[ycord-3][xcord+3]],[M[ycord][xcord+1],
          M[ycord-1][xcord+2],
          M[ycord-2][xcord+3]]];

          M0.push(u);

  }
}
 return M0
}

export function Matching2(P,n) {
  // create empty (n+2)x(n+2) matrix M. We pad by 1 to simplify algorithm
  // at corners. The padding is then stripped away at the end
  const M = new Uint8Array((n+2)*(n+2));
  const m = n/2;
  let k = 0;
  let ns = n+2;
  const plen = P.length;

  for (let i = 0; i<=m; i++) {
    // store 'active' cells that need to be filled in the creation step
    // const Mcells = [];
    // iterate over cells to match, from top-left,
    // columnwise down and then one step right
    const shift = (1+ns)*(m-i+1);

    // which cells are for creation Mc
    const Mc = [];
    // let d0 = performance.now();
    for (let x=0; x<=2*(i-1); x += 2) {
      for (let y=0; y<=2*(i-1); y += 2) {
            const pos = x * ns + y + shift;
            switch (M[pos] + M[pos + 1] + M[pos + ns]  + M[pos + ns + 1]) {
                case 1: // slide if only 1 edge
                    const temp = M[pos];
                    M[pos] = M[pos + ns +1];
                    M[pos + ns +1] = temp;
                    const temp2 = M[pos + ns];
                    M[pos + ns] = M[pos+1];
                    M[pos+1] = temp2;
                    break;
                case 2: // destroy if 2 edges
                    M[pos] = 0;
                    M[pos + 1] = 0;
                    M[pos + ns] = 0;
                    M[pos + ns + 1] = 0;
                    // store active cell
                    Mc.push(x,y);
                    break;
                case 0:
                    // store active cell
                    Mc.push(x,y);
                    break;
              }
        }
    }
    // the creation step, fill using Mcells
    for (let r=0, mlen = Mc.length; r<mlen; r+= 2) {
        // get location
        //const pos = Mc[r];
        // const x = Mc[r];
        // const y = Mc[r+1];
        const pos = Mc[r] * ns + Mc[r+1] + shift;
        //if (i < 4) { console.log([ktest, Mc[r+1]])}
        // check if cells below/to the left have been filled
        // note: creation step depends on order of filling
        //if (!(M[pos - 1] || M[pos - ns] ||  M[pos + 2*ns] || M[pos + ns - 1])) {
        if (!(M[pos - 1] || M[pos - ns] ||  M[pos + 2] || M[pos + ns - 1])) {
            // randomly assign new matching according to weight calculated in P
            //if (Math.random() < P[plen-Mc[r+1]]) {
            const rand = P[plen - (Mc[r+1]/2*i + Mc[r]/2 + 1 + (i-1)*i*(2*i-1)/6)];
            //if (Math.random() < P[plen-k]) {
            if (Math.random() < rand) {
                M[pos] = 1;
                M[pos + ns + 1] = 1;
            } else {
                M[pos + 1] = 1;
                M[pos + ns] = 1;
            }
        }
    }
  }
  // strip away the padding and invert in y-axis
  // one could also avoid this and re-define drawHexagon to skip padding
  // or just return the matching in the corner.
  const Mnew = [];

    for (let i=1; i<=n; i++) {
      const Mrow = new Uint8Array(n);
      for (let j=1; j<=n; j++) {
        Mrow[j-1] = M[i * ns + j];
      }
      Mnew.push(Mrow);
    }
  return Mnew;
}

export function createFortress(Hexagon, app) {
  // createHexagon draws the Hexagon tri
  let width = app.resizeTo.offsetWidth;
  let height  = app.resizeTo.offsetHeight;

  // drawing options;
  // draw edges
  let lineThickness = Hexagon.lineThickness;
  if (!Hexagon.draw_edges) {
    lineThickness = 0;
  }
  // draw paths
  const paths = Hexagon.draw_paths;

  // get hexagon parameters
  const a = Hexagon.a;


  // recale if rotated
  let scale = 1;
  if (Hexagon.rotation) {
    scale = Hexagon.shape.rescale;
  }

  // length of unit to fit the screen / normalize into canvas
  const r = scale*Math.min(width,height)/(a+1);

  // save r
  Hexagon.r = r;

  // center of hexagon
  const x_center = r*(a-1)/2;
  const y_center = r*(a-1)/2;

  // create container
  let container = new PIXI.Container();
  app.stage.addChildAt(container,0);

  // put hexagon in the middle
  container.x = width/2;
  container.y = height/2;

  // rotate hexagon if chosen
  container.rotation = Hexagon.rotation;

  // store tri
  app.stage.lozenges = [];
  // blue dots
  for (let i = 0; i < a+1; i++) {
    for (let j = 0; j < a+1; j++) {
      // add tri to container and to dominos for future access

        // current coordinate of hexagon center
        const x_cord = r*j;
        const y_cord = r*i;

        // transform up-down
        const x0 = -x_center + x_cord;
        const y0 = y_center - y_cord;
        let vec = [];
        let triangles;

        if (i == 0 && j == 0) {
          triangles = [[0,0,4]];
        } else if (i == a && j == a) {
          triangles = [[-1,-1,1]];
        } else if (j == 0 && i % 2 == 0) {
          triangles = [[0,0,4],[0,-1,2]];
        } else if (i == 0 && j % 2 == 0) {
          triangles = [[0,0,4],[-1,0,3]];
        } else if (i == a && j % 2) {
          triangles = [[-1,-1,1],[0,-1,2]];
        } else if (j == a && i % 2) {
          triangles = [[-1,-1,1],[-1,0,3]];
        } else {
          triangles = [[-1,-1,1], [0,-1,2], [-1,0,3], [0,0,4]];
        }

        for (let k=0, len = triangles.length; k<len; k++) {
          let tri = createTriangle(x0,y0,r,triangles[k][2]+3,lineThickness, paths);
          tri.tint = 0x0002d7*(k+1);//Hexagon.loz_colors[2+k];//'0x' + rainbow.colorAt(33*k);
          // hide all dominos until the matching activates the relevant ones
          tri.visible = false;
          // give coord to tri
          tri.j = 3*j + i + triangles[k][0];
          tri.i = (3*i + j + triangles[k][1]);
          tri.type = triangles[k][2]+3;
          app.stage.lozenges.push(tri);
          container.addChild(tri);
        }
    }
  }

  // orange dots (note i = a + 1)
  for (let i = 0; i < a+1; i++) {
    for (let j = 0; j < a; j++) {
      // add tri to container and to dominos for future access
        // current coordinate of hexagon center
        const x_cord = r*j;
        const y_cord = r*i - r/2;

        // transform up-down
        const x0 = -x_center + x_cord;
        const y0 = y_center - y_cord;

        let tri;
        tri = createTriangle(x0,y0,r,1,lineThickness, paths);
        tri.tint = Hexagon.loz_colors[0];

        // hide all dominos until the matching activates the relevant ones
        tri.visible = false;
        // give coord to tri
        tri.i = 3*i + j;
        tri.j = 3*j + i + 1;
        tri.type = 1;
        app.stage.lozenges.push(tri);
        container.addChild(tri);
    }
  }

  // purple dots (note j = a + 1)
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < a+1; j++) {
      // add tri to container and to dominos for future access

        // current coordinate of hexagon center
        const x_cord = r*j - r/2;
        const y_cord = r*i;

        // transform up-down
        const x0 = -x_center + x_cord;
        const y0 = y_center - y_cord;

        let tri;
        tri = createTriangle(x0,y0,r,2,lineThickness, paths);
        tri.tint = Hexagon.loz_colors[1];

        // hide all dominos until the matching activates the relevant ones
        tri.visible = false;
        // give coord to tri
        tri.i = 3*i + j + 1;
        tri.j = 3*j + i;
        tri.type = 2;
        app.stage.lozenges.push(tri);
        container.addChild(tri);
    }
  }
}

function createTriangle(xPos, yPos, r, type, lineThickness = 1, paths = false, i,j)
{
  let tri = new PIXI.Graphics();
  tri.x = xPos;
  tri.y = yPos;
  // rescale r
  r = r;
  // types: 1 2 3 4 - triangles, 5 - diamond
  tri.beginFill(0xFFFFFF, 1);
  tri.lineStyle(1, 0x000000, 0);
  if (type == 7) {
    tri.lineTo(-r, 0);
    tri.lineTo(0, r);
    tri.lineTo(0, 0);
  } else if (type == 5) {
    tri.lineTo(0, r);
    tri.lineTo(-r, r);
    tri.lineTo(0, 0);
  } else if (type == 6) {
    tri.lineTo(-r, 0);
    tri.lineTo(-r, r);
    tri.lineTo(0, 0);
  } else if (type == 4) {
    tri.moveTo(-r, 0);
    tri.lineTo(-r, r);
    tri.lineTo(0, r);
    tri.lineTo(-r, 0);
  } else if (type == 1 || type == 2) {
    tri.x += r/2;
    tri.moveTo(-r, 0);
    tri.lineTo(-r/2, r/2);
    tri.lineTo(0,0);
    tri.lineTo(-r/2, -r/2);
    tri.lineTo(-r, 0);
  }
  tri.endFill();

  if (paths) {
    tri.lineStyle(1, 0x000000);
    if (type == 2 ) {
      tri.moveTo(-r/2,r/2);
      tri.lineTo(-r/2, -r/2);
    } else if (type == 1) {
      tri.moveTo(-r, 0);
      tri.lineTo(0, 0);
    }
  }


  return tri
}
