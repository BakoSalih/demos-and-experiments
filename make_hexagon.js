for (i = 0; i < 2*n-1; i++) {
  for (j = 0; j < 2*m-1; j++) {

    // current coordinate of hexagon center
    const x_cord = r*(j * u[0] + i * v[0]);
    const y_cord = height - r*(j * u[1] + i * v[1]);

    // transform up-down
    const x0 = -x_center + x_cord;
    const y0 = -height + y_center + y_cord;

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

      // hide all lozenges until the matching activates the relevant ones
      lozenge.visible = false;
      app.stage.lozenges[i][j] = lozenge;
      container.addChild(lozenge);
    }
  }
}
