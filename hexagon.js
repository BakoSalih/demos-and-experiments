export function createHexagon(Hexagon, app) {
  // createHexagon draws the Hexagon lozenges
  let width = Hexagon.width;
  let height = Hexagon.height;

  // get hexagon parameters
  const a = Hexagon.a,
        b = Hexagon.b,
        c = Hexagon.c;

  // constants for the grid directions
  const u = Hexagon.u;
  const v = Hexagon.v;
  const w = Hexagon.w;

  // length of unit to fit the screen / normalize into canvas
  const rx = width/(-a * v[0] + b * u[0] + c * w[0]);
  const ry = height/(a * v[1] + c * w[1]);
  const r = 0.9*Math.min(rx/2,ry/2);

  // save r
  Hexagon.r = r;

  // drawing options;
  // draw edges
  let lineThickness = Hexagon.lineThickness;
  if (!Hexagon.draw_edges) {
    lineThickness = 0;
  }
  // draw paths
  const paths = Hexagon.draw_paths;

  // center of hexagon
  const x_center = r*(a * v[0] + b * u[0] + c * w[0]);
  const y_center = r*(a * v[1] + b * u[1] + c * w[1]);

  // create container
  //let container = new PIXI.ParticleContainer((2*(a+c)-1)*(2*(b+c)-1), {tint: true});
  let container = new PIXI.Container();
  app.stage.addChildAt(container,0);

  // put hexagon in the middle
  container.x = width/2;
  container.y = height/2;

  // rotate hexagon if chosen
  container.rotation = Hexagon.rotated;


  // store lozenges
  app.stage.lozenges = [];
  for (let i = 0; i < 2*(a+c)-1; i++) {
    for (let j = 0; j < 2*(b+c)-1; j++) {
      // add lozenge to container and to lozenges for future access
      if ((i < 2*a && j < 2*b + i) || (i >= 2*a && j > i-2*a && j < 2*b + i)) {

        // current coordinate of hexagon center
        const x_cord = r*(j * u[0] + i * v[0]);
        const y_cord = r*(j * u[1] + i * v[1]);

        // transform up-down
        const x0 = -x_center + x_cord;
        const y0 = y_center - y_cord;
        let lozenge;
        let lozvertex;
        if (j % 2 == 0 && i % 2 == 0) {
          // (even,even) position lozenge
          lozenge = createLozenge(x0, y0, r, 1, lineThickness, paths, Hexagon.loz_colors);
          lozenge.type = 1;
        } else if (j % 2 == 1 && i % 2 == 0) {
          // (even,odd) position lozenge
          lozenge = createLozenge(x0, y0, r, 2, lineThickness, paths, Hexagon.loz_colors);
          lozenge.type = 2;
        } else if (j % 2 == 0 && i % 2 == 1) {
          // (odd,even) position lozenge
          lozenge = createLozenge(x0, y0, r, 3, lineThickness, paths, Hexagon.loz_colors);
          lozenge.type = 3;
        } else {
          continue;
        }
        // hide all lozenges until the matching activates the relevant ones
        lozenge.visible = false;
        // give coord to lozenge
        lozenge.i = i;
        lozenge.j = j;
        app.stage.lozenges.push(lozenge);
        container.addChild(lozenge);
      }
    }
  }
  // {let vertex2 = createVertex(x_center,y_center);
  // container.addChild(vertex2);}
  // {let vertex2 = createVertex(-300,-300);
  // container.addChild(vertex2);}
  // {let vertex2 = createVertex(400,400);
  // container.addChild(vertex2);}
  // let vertex2 = createVertex(-r, -Math.sqrt(3) * r);
  // // let vertex3 = createVertex(-x_center+ r*(2*a * v[0]),y_center- r*(2*a * v[1]));
  // let vertex3 = createVertex(3*r, -Math.sqrt(3) * r);
  // container.addChild(vertex3);
  // let vertex4 = createVertex(-x_center+ r*(2*b * u[0]),y_center- r*(2*b * u[1]));
  // container.addChild(vertex4);
}


function createLozenge(xPos, yPos, r, type, lineThickness = 1, paths = false, loz_colors = [0x1cff00, 0xfc0606, 0x0555db])
{
  let loz = new PIXI.Graphics();
  loz.x = xPos;
  loz.y = yPos;
  if (type == 1) { //
    // loz.x = xPos - r/2;
    // loz.y = yPos + r*Math.sqrt(3)/2;
    loz.beginFill(0xFFFFFF, 1);
    loz.tint = loz_colors[0];
    loz.lineStyle(1, 0x000000, lineThickness);
    loz.moveTo(0, 0);
    loz.lineTo(2*r, 0);
    loz.lineTo(r, -r*Math.sqrt(3));
    loz.lineTo(-r, -r*Math.sqrt(3));
    loz.endFill();

    // if we want paths we set tint to 0 and draw a line in middle
    if (paths == 1) {
      //loz.tint = 0xFFFFFF;
      loz.lineStyle(1, 0x000000);
      loz.moveTo(-r/2,-r*Math.sqrt(3)/2);
      loz.lineTo(3*r/2, -r*Math.sqrt(3)/2);
    }

  } else if (type == 2) { // top lozenge
    loz.x += r;
    // loz.y = yPos + r*Math.sqrt(3)/2;
    loz.beginFill(0xFFFFFF, 1);
    loz.tint = loz_colors[1];
    loz.lineStyle(1, 0x000000, lineThickness);
    loz.moveTo(0, 0);
    loz.lineTo(r, -r*Math.sqrt(3));
    loz.lineTo(-r, -r*Math.sqrt(3));
    loz.lineTo(-2*r, 0);
    loz.lineTo(0,0);
    loz.endFill();

  } else if (type == 3) { //
    loz.x += r/2;
    loz.y += r*Math.sqrt(3)/2;
    loz.beginFill(0xFFFFFF, 1);
    loz.tint = loz_colors[2];
    loz.lineStyle(1, 0x000000, lineThickness);
    loz.moveTo(0, 0);
    loz.lineTo(r, -r*Math.sqrt(3));
    loz.lineTo(0, -2*r*Math.sqrt(3));
    loz.lineTo(-r, -r*Math.sqrt(3));
    loz.lineTo(0, 0);
    loz.endFill();

    // if we want paths we set tint to 0 and draw a line in middle
    if (paths) {
      //loz.tint = 0xFFFFFF;
      loz.lineStyle(1, 0x000000);
      loz.moveTo(-r/2, -r*Math.sqrt(3)/2);
      loz.lineTo(r/2, -3*r*Math.sqrt(3)/2);
    }

  }
  return loz
}

export function choose_weight(Hexagon) {
  let weight;
  const A = Hexagon.a,
        B = Hexagon.b,
        C = Hexagon.c;
  let N;
  if (Hexagon.shape == "hexagon") {
    N = B+C+1;
  } else if (Hexagon.shape == "aztec") {
    N = 2*A;
  }

  const type = Hexagon.weight_type;
  const a = Hexagon.weight_q;
  const kappa = document.getElementById("kappa").valueAsNumber;
  const nums = document.getElementById("rownums").valueAsNumber;
  if (type == "uniform") {
    weight = [[1],[1]];
  } else if (type == "qvolume") {
    const q = Math.exp(-a/N);
    // make array
    let bottom = new Array(N);
    bottom.fill(1);
    let top = new Array(N);
    for (let k=0;k<N;k++) {
      top[k] = q**k;
    }
    weight = [top, bottom];
  } else if (type == "periodic1x2") {
    weight = [[1, 1], [a, 1]];
  } else if (type == "periodic2x2") {
    weight = [[a, 1], [1, 1], [1, a], [1, a**2]];
  } else if (type == "periodic2x3") {
    weight = [[a,1,1], [a,1,1], [1,1,a], [1,1,a]];
  } else if (type == "qracah") {
    const q = Math.exp(-a/N);
    // make array
    let bottom = new Array(N);
    bottom.fill(1);
    let top = new Array(N);
    for (let k=0;k<N;k++) {
      top[k] = kappa*q**k - 1/(kappa*q**k);
    }
    weight = [top, bottom];
  } else if (type == "racah") {
      let bottom = new Array(N);
      bottom.fill(1);
      let top = new Array(N);
      for (let k=0;k<N;k++) {
        top[k] = a + k;
      }
      weight = [top, bottom];
  } else if (type == "trigqracah") {
      const q = Math.exp(-a/N);
      // make array
      let bottom = new Array(N);
      bottom.fill(1);
      let top = new Array(N);
      for (let k=0;k<N;k++) {
        top[k] = kappa*q**k - 1/(kappa*q**k);
      }
      weight = [top, bottom];
  } else if (type == "custom2") {
    // let rows = document.getElementById("rownums").valueAsNumber
    // let c = Math.ceil(Math.random(2)+0.5);
    // let d = Math.random(1);
    // weight = [[a,a**c,d**(c+1)], [a,a**c,c**(c+1)]];
    weight = [];
    // //bottom.fill(1);
    let xmod = Math.round(nums);
    let ymod = Math.round(kappa);
    //console.log([xmod, ymod])
    for (let i=0;i<N;i++) {
      let row = [];
      for (let k=0;k<N;k++) {
        if (i % ymod == 0 && k % xmod == 0) {
          row.push(1);
        } else if (i % ymod > 0 && k % xmod > 0) {
          row.push(a**(k % xmod - i % ymod));
        } else if (i % ymod == 0 && k % xmod > 0) {
          row.push(a**(k % xmod + i % ymod));
        } else if (i % ymod > 0 && k % xmod == 0) {
          row.push(a**(i % ymod));
        }
      }
      weight.push(row);
    }
  } else if (type == "custom") {
      // let rows = document.getElementById("rownums").valueAsNumber
      // let c = Math.ceil(Math.random(2)+0.5);
      // let d = Math.random(1);
      // weight = [[a,a**c,d**(c+1)], [a,a**c,c**(c+1)]];
      weight = [];
      // //bottom.fill(1);
      let xmod = Math.round(nums);
      let ymod = Math.round(kappa);
      //console.log([xmod, ymod])
      for (let i=0;i<N;i++) {
        let row = [];
        for (let k=0;k<N;k++) {
          if (i % ymod == 0 && k % xmod == 0) {
            row.push(1);
          } else if (i % ymod == 0 && k % xmod > 0) {
            row.push(a**(k % xmod));
          } else if (i % ymod > 0 && k % xmod == 0) {
            row.push(a**(i % ymod));
          } else {
            row.push(0.5*(a**(i % ymod)+a**(k % xmod)));
          }
        }
        weight.push(row);
      }
  } else if (type == "weird1") {
    weight = []
    // //bottom.fill(1);
    let xmod = 3;
    let ymod = 3;
    //console.log([xmod, ymod])
    for (let i=0;i<N;i++) {
      let row = [];
      for (let k=0;k<N;k++) {
        if (i % ymod == 0 && k % xmod == 0) {
          row.push(1);
        } else if (i % ymod == 0 && k % xmod > 0) {
          row.push(1);
        } else if (i % ymod > 0 && k % xmod == 0) {
          row.push(a**(i % xmod - k % ymod));
        } else {
          row.push(1);
        }
      }
      weight.push(row);
    }
  }
  return weight
}
