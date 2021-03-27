// function for toggling edges on and off
export function edges(State, choice="toggle") {
  //State.lineThickness = document.getElementById("edges").checked;
  if (choice == "toggle") {
    if (State.draw_edges) {
      State.draw_edges = false;
      document.getElementById("edgebutton")
        .setAttribute("class", "togglebutton");
    } else {
      State.draw_edges = true;
      document.getElementById("edgebutton")
        .setAttribute("class", "togglebuttonpressed");
    }
  } else if (choice=="edges") {
    State.draw_edges = true;
    document.getElementById("edgebutton")
      .setAttribute("class", "togglebuttonpressed");
  } else if (choice=="no edge") {
    State.draw_edges = false;
    document.getElementById("edgebutton")
      .setAttribute("class", "togglebutton");
  }
  regraphics();
}

// function for toggling paths on and off
export function paths(State, choice="toggle") {
  //State.lineThickness = document.getElementById("edges").checked;
  if (choice == "toggle") {
    if (State.draw_paths) {
      State.draw_paths = false;
      document.getElementById("pathbutton")
        .setAttribute("class", "togglebutton");
    } else {
      State.draw_paths = true;
      document.getElementById("pathbutton")
        .setAttribute("class", "togglebuttonpressed");
    }
  } else if (choice=="edges") {
    State.draw_paths = true;
    document.getElementById("pathbutton")
      .setAttribute("class", "togglebuttonpressed");
  } else if (choice=="no edge") {
    State.draw_paths = false;
    document.getElementById("pathbutton")
      .setAttribute("class", "togglebutton");
  }
  regraphics(State);
}

export function hidewform() {
  const wtype = document.getElementById("wtype").value;
  if (wtype == "uniform") {
    document.getElementById("cweight").style.display = "none";
  } else {
    document.getElementById("cweight").style.display = "inline";
  }
  if (wtype == "custom" || wtype == "custom2" ) {
    document.getElementById("cweight").style.display = "none";
    document.documentElement.style.setProperty('--showCustom', 'inline');
    // document.getElementById("rownums").style.display = "inline";
    // document.getElementById("rows").style.display = "inline";
    // document.getElementById("kappa").style.display = "inline";
  } else {
    document.documentElement.style.setProperty('--showCustom', 'none');
    // document.getElementById("rownums").style.display = "none";
    // document.getElementById("rows").style.display = "none";
    // document.getElementById("kappa").style.display = "none";
  }

 }


 export function randomHex(prefix='') {
   const nums = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
   let hex = prefix;
   for (let i=0;i<6;i++) {
     let rndHex = nums[Math.floor(Math.random() * Math.floor(16))];
     hex += rndHex;
   }
   return hex;
 }

export function interpretMatrix(input, key, N) {
  // split rows
  let row_regex = /\s*\;\s*/g;
  let mat = input.split(row_regex)
  // split columns
  let col_regex = /\s*\,\s*/
  mat = mat.map(x => x.split(col_regex));

  const coldim = mat.length;
  const rowdims = mat.map(x => x.length);
  const rowdim = Math.min(...rowdims);

  // raise error if not given a square matrix
  if (rowdim != Math.max(...rowdims)) {
    console.log("Warning: rows not equal length, will use up to shortest row");
    for (let i=0;i<coldim;i++) {
      mat[i] = mat[i].slice(0,rowdim);
    }
  }

  // try to convert to integer, if doesn't work, add as constant
  // array of constants
  // mat.constants = {};

  // define q = exp(-a/N)
  key["q"] = Math.exp(-key["a"]/N);
  let regex = /[i|j]/g;
  let weightmat = [];
  // if i or j exists in weight, the weight will be
  let totcol;
  let totrow;

  // check if i or j exists
  if (input.match(/i/) && input.match(/i/).length > 0) {
    totcol = N;
  } else {
    totcol = coldim;
  }
  if (input.match(/j/) && input.match(/j/).length > 0) {
    totrow = N;
  } else {
    totrow = rowdim;
  }

  for (let i=0; i<totcol; i++) {
    weightmat[i] = new Array(totrow);
    for (let j=0; j<totrow; j++) {
      let tryfloat = parseFloat(mat[i % coldim][j % rowdim]);
      key["i"] = i;
      key["j"] = j;
      if (!isNaN(tryfloat)) {
        weightmat[i][j] = tryfloat;
      } else {
        weightmat[i][j] = math.evaluate(mat[i % coldim][j % rowdim], key);
      }
    }
  }

  return weightmat

  // if (input.match(regex) && input.match(regex).length > 0) {
  //   for (let i=0; i<coldim; i++) {
  //     weightmat[i] = new Array(N);
  //     for (let j=0; j<N; j++) {
  //       let tryfloat = parseFloat(mat[i % coldim][j % rowdim]);
  //       key["i"] = i;
  //       key["j"] = j;
  //       if (!isNaN(tryfloat)) {
  //         weightmat[i][j] = tryfloat;
  //       } else {
  //         weightmat[i][j] = math.evaluate(mat[i % coldim][j % rowdim], key);
  //       }
  //     }
  //   }
  //   return weightmat;
  // } else {
  //
  //   return mat;
  // }



}
