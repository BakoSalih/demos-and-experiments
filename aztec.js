export function createAztec(Hexagon, app) {
  // createHexagon draws the Hexagon domino
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
  const r = scale*Math.min(width,height)/(2*(a+1));

  // save r
  Hexagon.r = r;

  // center of hexagon
  const x_center = r*a - r/2;
  const y_center = r*a - r/2;

  // create container
  //let container = new PIXI.ParticleContainer((2*(a+c)-1)*(2*(b+c)-1), {tint: true});
  let container = new PIXI.Container();
  app.stage.addChildAt(container,0);

  // put hexagon in the middle
  container.x = width/2;
  container.y = height/2;

  // rotate hexagon if chosen
  container.rotation = Hexagon.rotation;


  // store domino
  app.stage.lozenges = [];
  for (let i = 0; i < 2*a; i++) {
    for (let j = 0; j < 2*a; j++) {
      // add domino to container and to dominos for future access

        // current coordinate of hexagon center
        const x_cord = r*j;
        const y_cord = r*i;

        // transform up-down
        const x0 = -x_center + x_cord;
        const y0 = y_center - y_cord;

        let domino;
        if (i % 2 == 0 && j % 2 == 0) {
          domino = createDomino(x0, y0, r, 1, lineThickness, paths, Hexagon.loz_colors);
          domino.type = 1;
        } else if (i % 2 == 1 && j % 2 == 1) {
          domino = createDomino(x0, y0, r, 2, lineThickness, paths, Hexagon.loz_colors);
          domino.type = 2;
        } else if (i % 2 == 0 && j % 2 == 1) {
          domino = createDomino(x0, y0, r, 3, lineThickness, paths, Hexagon.loz_colors)
          domino.type = 3;
        } else if (i % 2 == 1 && j % 2 == 0) {
          domino = createDomino(x0, y0, r, 4, lineThickness, paths, Hexagon.loz_colors);
          domino.type = 4;
        }
        // hide all dominos until the matching activates the relevant ones
        domino.visible = false;
        // give coord to domino
        domino.i = i;
        domino.j = j;
        app.stage.lozenges.push(domino);
        container.addChild(domino);
    }
  }
}

export function createDomino(xPos, yPos, r, type, lineThickness = 1, paths = false, loz_colors = [0x1cff00, 0xfc0606, 0x0555db, 0xfaff00])
{
  let domino = new PIXI.Graphics();
  domino.x = xPos;
  domino.y = yPos;
  // rescale r
  r = r/(2);
  if (type == 3 || type == 4) {
    domino.beginFill(0xFFFFFF, 1);
    domino.lineStyle(1, 0x000000, lineThickness);
    domino.moveTo(-3*r, r);
    domino.lineTo(-r, 3*r);
    domino.lineTo(3*r, -r);
    domino.lineTo(r, -3*r);
    domino.lineTo(-3*r, r);
    domino.endFill();
  } else if (type == 1 || type == 2) {
    domino.beginFill(0xFFFFFF, 1);
    domino.lineStyle(1, 0x000000, lineThickness);
    domino.moveTo(r,3*r);
    domino.lineTo(3*r, r);
    domino.lineTo(-r, -3*r);
    domino.lineTo(-3*r,-r);
    domino.lineTo(r,3*r);
    domino.endFill();
  }

  if (type == 1) {
      domino.tint = loz_colors[2];
      if (paths == 1) {
        domino.lineStyle(1, 0x000000);
        domino.moveTo(0,-2*r);
        domino.lineTo(0, 2*r);
      }
  } else if (type == 2) {
      domino.tint = loz_colors[1];
      if (paths == 1) {
        domino.lineStyle(1, 0x000000);
        domino.moveTo(-2*r, 0);
        domino.lineTo( 2*r, 0);
      }
  } else if (type == 3) {
      domino.tint = loz_colors[0];
      if (paths == 1) {
        domino.lineStyle(1, 0x000000);
        domino.moveTo(-2*r, 2*r);
        domino.lineTo( 2*r, -2*r);
      }
  } else if (type == 4) {
      domino.tint = loz_colors[3];
  }

  return domino
}


export function square_weight(W) {
  let pt = (W.length)/2;
  let endpt = W.length-1;

  if (pt % 2 == 1) {
  // the diagonal length
    // W[pt-1][0] = 0;
    // W.holes[pt-1][0] = 1;
    // W[pt][0] = 0;
    // W.holes[pt][0] = 1;
    for (let i = 0; i < (W.length)/2 - 1; i++) {
      // bottom-left
      W[pt+1+i][i] = 0;
      // top-left
      W[pt-2-i][i] = 0;
      // bottom-right
      W[pt-2-i][endpt-i] = 0;
      // top-right
      W[pt+1+i][endpt-i] = 0;
      // hide rest of aztec
      for (let j = 0; j <= i; j++) {
        W.holes[pt+1+i][i-j] = 1; // bottom-left
        W.holes[pt-2-i][i-j] = 1; // top-left
        W.holes[pt-2-i][endpt-i+j] = 1;  // bottom-right
        W.holes[pt+1+i][endpt-i+j] = 1; // top-right
      }
    }
  } else {
    // W[pt-1][0] = 0;
    // W.holes[pt-1][0] = 1;
    // W[pt][0] = 0;
    // W.holes[pt][0] = 1;
    for (let i = 0; i < (W.length)/2; i++) {
      // bottom-left
      W[pt+i][i] = 0;
      // top-left
      W[pt-1-i][i] = 0;
      // bottom-right
      W[pt-1-i][endpt-i] = 0;
      // top-right
      W[pt+i][endpt-i] = 0;

      // hide rest of aztec
      for (let j = 0; j <= i; j++) {
        W.holes[pt+i][i-j] = 1; // bottom-left
        W.holes[pt-1-i][i-j] = 1; // top-left
        W.holes[pt-1-i][endpt-i+j] = 1;  // bottom-right
        W.holes[pt+i][endpt-i+j] = 1; // top-right
      }
    }
  }
  return W
}
