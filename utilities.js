// function for toggling edges on and off
export function edges(Hexagon, choice="toggle") {
  //Hexagon.lineThickness = document.getElementById("edges").checked;
  if (choice == "toggle") {
    if (Hexagon.draw_edges) {
      Hexagon.draw_edges = false;
      document.getElementById("edgebutton")
        .setAttribute("class", "togglebutton");
    } else {
      Hexagon.draw_edges = true;
      document.getElementById("edgebutton")
        .setAttribute("class", "togglebuttonpressed");
    }
  } else if (choice=="edges") {
    Hexagon.draw_edges = true;
    document.getElementById("edgebutton")
      .setAttribute("class", "togglebuttonpressed");
  } else if (choice=="no edge") {
    Hexagon.draw_edges = false;
    document.getElementById("edgebutton")
      .setAttribute("class", "togglebutton");
  }
  regraphics();
}

// function for toggling paths on and off
export function paths(Hexagon, choice="toggle") {
  //Hexagon.lineThickness = document.getElementById("edges").checked;
  if (choice == "toggle") {
    if (Hexagon.draw_paths) {
      Hexagon.draw_paths = false;
      document.getElementById("pathbutton")
        .setAttribute("class", "togglebutton");
    } else {
      Hexagon.draw_paths = true;
      document.getElementById("pathbutton")
        .setAttribute("class", "togglebuttonpressed");
    }
  } else if (choice=="edges") {
    Hexagon.draw_paths = true;
    document.getElementById("pathbutton")
      .setAttribute("class", "togglebuttonpressed");
  } else if (choice=="no edge") {
    Hexagon.draw_paths = false;
    document.getElementById("pathbutton")
      .setAttribute("class", "togglebutton");
  }
  regraphics(Hexagon);
}

export function hidewform() {
  const wtype = document.getElementById("wtype").value;
  if (wtype == "uniform") {
    document.getElementById("cweight").style.display = "none";
  } else {
    document.getElementById("cweight").style.display = "inline";
  }
  if (wtype == "custom" || wtype == "custom2" ) {
    document.getElementById("rownums").style.display = "inline";
    document.getElementById("rows").style.display = "inline";
    document.getElementById("kappa").style.display = "inline";
  } else {
    document.getElementById("rownums").style.display = "none";
    document.getElementById("rows").style.display = "none";
    document.getElementById("kappa").style.display = "none";
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
