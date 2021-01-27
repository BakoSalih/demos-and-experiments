
import { weight_hexagon } from 'weight_hexagon.js';

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}
//Create a Pixi Application
let app = new PIXI.Application({
  width: 500,
  height: 500,
  antialias: true,
  transparent: true,
  resolution: 1
}
);

//Add the canvas that Pixi automatically created for you to the HTML document
//document.body.appendChild(app.view);
document.getElementById("sim").appendChild(app.view);

// get A,B,C from input
const A = document.getElementById("Abox").valueAsNumber;
const B = document.getElementById("Bbox").valueAsNumber;
const C = document.getElementById("Cbox").valueAsNumber;

// edges exist of not
app.stage.edgeExist = 1;
// initial rotation
app.stage.rotated = 0;

// create initial matching


let W = weight_hexagon([[1],[1]],1,A,B,C);
//W = gap(W,A,B,C,2,0,0);
W = W_split(W);
let P = Reduction(W, W.im);
let M = Matching(P, W[0].length);

//load an image and run the `setup` function when it's done
const loader = new PIXI.Loader();
loader
.load(setup(A, B, C));
//.load(setup(A, B, C, M));

drawHexagon(A,B,C,M)

function regenerate() {
  //
  // let W = weight_hexagon([[1],[1]],1,a,b,c)
  // W = W_split(W);
  // let P = Reduction(W, W.im);
  const A = document.getElementById("Abox").valueAsNumber;
  const B = document.getElementById("Bbox").valueAsNumber;
  const C = document.getElementById("Cbox").valueAsNumber;

  let M = Matching(P, W[0].length);
  drawHexagon(A,B,C,M);
  // app.ticker.add((delta) => {
  //   d += delta
  //   if (Math.floor(d) % 50 == 0) {
  //   app.stage.removeChildren(0)
  //   let M = Matching(P);
  //   setup(3, 3, 3);
  //   }
  // });
}

function rotate() {
  let container = app.stage.children[0];
  if (container.rotation == 0) {
    container.rotation = Math.PI/6;
    container.x = 200;
    container.y = -100;
  } else {
    container.rotation = 0;
    container.x = 0;
    container.y = 0;
  }
}

function edges() {
  if (app.stage.edgeExist == 1) {
    app.stage.edgeExist = 0;
  } else {
    app.stage.edgeExist = 1;
  }

}

function myFunction() {
  //app.stage.removeChildren(0)
  // constants for the size of the hexagon
  const A = document.getElementById("Abox").valueAsNumber;
  const B = document.getElementById("Bbox").valueAsNumber;
  const C = document.getElementById("Cbox").valueAsNumber;

  app.stage.removeChildren(0);
  setup(A, B, C);

//  setup(A, B, C, M);
}

function regularHex() {
  app.stage.removeChildren(0)
  // constants for the size of the hexagon
  const N = document.getElementById("Nbox").valueAsNumber;

  // set A,B,C
  document.getElementById("Abox").setAttribute("value", N);
  document.getElementById("Bbox").setAttribute("value", N);
  document.getElementById("Cbox").setAttribute("value", N);

  app.stage.removeChildren(0);
  setup(N,N,N);
  //setup(N, N, N, M);
}


// This `setup` function will run when the image has loaded
// Paints the matching
function setup(a, b, c) {

	let container = new PIXI.Container();
	app.stage.addChild(container);

  // edge exist?
  const lineThickness = app.stage.edgeExist;
  // initialize rotation
  if (app.stage.rotated = 0) {

  }

  const n = a + c;
  const m = b + c;

  // constants for the grid directions
  const u = [1,0];
  const v = [-1/2, Math.sqrt(3)/2];
  const w = [1/2, Math.sqrt(3)/2];


  // length of unit
  const r = 100/Math.max(Math.max(a,b),c);
  const x1 = r/4;
  const y1 = r* (Math.sqrt(3)/4 - 1/3);
  const width = 1/2 * r;
  const shift = 0;

  // app window size and padding
  const ycorner = app.screen.height;
  const padding = Math.sqrt(3)/2*r - (a+c)*r + app.screen.height/2;
  const xpadding = -r*a + app.screen.height/2;// + r*m;



app.stage.lozenges = [];
for (i=0; i<2*n-1; i++) {
  const row = new Array(2*m-1);
  app.stage.lozenges.push(row);
}

for (i = 0; i < 2*n-1; i++) {
  for (j = 0; j < 2*m-1; j++) {
    // current coordinate of hexagon center
    const x_cord = r*(j * u[0] + i * v[0] );
    const y_cord = r*(j * u[1] + i * v[1]);

    // transform up-down and add padding
    const x0 = x_cord + xpadding;
    const y0 = ycorner - y_cord - padding;

    // add lozenge to container and to lozenges for future access
    if ((i < 2*a && j < 2*b + i) || (i >= 2*a && j > i-2*a)) {
      let lozenge;
      if (j % 2 == 0 && i % 2 == 0) {
        // (even,even) position lozenge
        lozenge = createLozenge(x0, y0, r, 1, lineThickness);
      } else if (j % 2 == 1 && i % 2 == 0) {
        // (even,odd) position lozenge
        lozenge = createLozenge(x0, y0, r, 2, lineThickness);
      } else if (j % 2 == 0 && i % 2 == 1) {
        // (odd,even) position lozenge
        lozenge = createLozenge(x0, y0, r, 3, lineThickness);
      } else {
        // (odd,odd) no lozenge
        lozenge = new PIXI.Graphics();
      }

      lozenge.visible = false;
      app.stage.lozenges[i][j] = lozenge;
      container.addChild(lozenge);
    }
  }
}
  // // all the vertices
  // let vertex = new PIXI.Graphics();
  // vertex.beginFill(0x000000);
  // vertex.drawCircle(x0, y0, 2);
  // vertex.endFill();
  // container.addChild(vertex);

  // create new matching
  W = weight_hexagon([[1],[1]],1,a,b,c)
  W = W_split(W);
  P = Reduction(W, W.im);
  M = Matching(P, W[0].length);

  // draw matching
  drawHexagon(a,b,c,M);

	// app.ticker.add((delta) => {
	// 		//container.rotation += 0.01* delta;
	// });

}

function createLozenge(xPos, yPos, r, type, lineThickness = 1)
{
  var loz = new PIXI.Graphics();
  if (type == 1) {
    loz.x = xPos - r/2;
    loz.y = yPos + r*Math.sqrt(3)/2;
    loz.beginFill(0x1cff00, 1);
    loz.lineStyle(1/2, 0x000000, lineThickness);
    loz.moveTo(0, 0);
    loz.lineTo(2*r, 0);
    loz.lineTo(r, -r*Math.sqrt(3));
    loz.lineTo(-r, -r*Math.sqrt(3));
    loz.endFill();
  } else if (type == 2) {
    loz.x = xPos + r/2;
    loz.y = yPos + r*Math.sqrt(3)/2;
    loz.beginFill(0xfc0606, 1);
    loz.lineStyle(1/2, 0x000000, lineThickness);
    loz.moveTo(0, 0);
    loz.lineTo(r, -r*Math.sqrt(3));
    loz.lineTo(-r, -r*Math.sqrt(3));
    loz.lineTo(-2*r, 0);
    loz.lineTo(0,0);
    loz.endFill();
  } else if (type == 3) {
    loz.x = xPos;
    loz.y = yPos + r*Math.sqrt(3);
    loz.beginFill(0xfffa8a, 1);
    loz.lineStyle(1/2, 0x000000, lineThickness);
    loz.moveTo(0, 0);
    loz.lineTo(r, -r*Math.sqrt(3));
    loz.lineTo(0, -2*r*Math.sqrt(3));
    loz.lineTo(-r, -r*Math.sqrt(3));
    loz.lineTo(0, 0);
    loz.endFill();
  }
  return loz
}


// updates the lozenges using matching matrix M
function drawHexagon(a,b,c,M,holes=[]) {
  const n = a+c;
  const m = b+c;

  for (i = 0; i < 2*n-1; i++) {
    for (j = 0; j < 2*m-1; j++) {
      // use Matching matrix M to make lozenges visible
      if ((i < 2*a && j < 2*b + i) || (i >= 2*a && j > i-2*a)) {
        if (M[i][j])  {
          app.stage.lozenges[i][j].visible = true;
        } else {
          app.stage.lozenges[i][j].visible = false;
        }
      }
    }
  }
  if (holes.length > 0) {
    for (i = 0; i < 2*n-1; i++) {
      for (j = 0; j < 2*m-1; j++) {
        // use Matching matrix M to make lozenges visible
        if ((i < 2*a && j < 2*b + i) || (i >= 2*a && j > i-2*a)) {
          if (holes[holes.length-1-i][j])  {
            app.stage.lozenges[i][j].visible = false;
          }
        }
      }
    }
  }
}
