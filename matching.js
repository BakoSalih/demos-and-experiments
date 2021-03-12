function Reduction(W) {

  const n = W.length;
  const m = n/2;

  let W_real = new Float64Array(n*n);
  let W_im = new Int32Array(n*n);

  for (let j=0; j<n; j++) {
    for (let i=0; i<n; i++) {
       W_im[i*n + j] = (W[j][i] == 0);
       W_real[i*n + j] = W[j][i] + (W[j][i] == 0);
        //  if (W[i][j] == 0) {
        //  W_im[i*n + j] = 1;
        //  W_real[i*n + j] = 1;
        //  } else {
        //  W_im[i*n + j] = 0;
        //  W_real[i*n + j] = W[i][j];
        // }
     }
  }

  // let W_real1 = new Float64Array(m*m);
  // let W_real2 = new Float64Array(m*m);
  // let W_real3 = new Float64Array(m*m);
  // let W_real4 = new Float64Array(m*m);
  // let W_im1 = new Int32Array(m*m);
  // let W_im2 = new Int32Array(m*m);
  // let W_im3 = new Int32Array(m*m);
  // let W_im4 = new Int32Array(m*m);
  //
  // for (let i=0; i<m; ++i) {
  //    for (let j=0; j<m; ++j) {
  //      W_im1[i*m + j] = (W[2*i][2*j] == 0);
  //      W_im2[i*m + j] = (W[2*i+1][2*j] == 0);
  //      W_im3[i*m + j] = (W[2*i][2*j+1] == 0);
  //      W_im4[i*m + j] = (W[2*i+1][2*j+1] == 0);
  //      W_real1[i*m + j] = W[2*i][2*j]     + (W[2*i][2*j]     == 0);
  //      W_real2[i*m + j] = W[2*i+1][2*j]   + (W[2*i+1][2*j]   == 0);
  //      W_real3[i*m + j] = W[2*i][2*j+1]   + (W[2*i][2*j+1]   == 0);
  //      W_real4[i*m + j] = W[2*i+1][2*j+1] + (W[2*i+1][2*j+1] == 0);
  //    }
  // }

  // console.log(W_im1);
  // console.log(W_im2);
  // console.log(W_im3);
  // console.log(W_im4);
  // console.log(W_im);

  // determine size of P and initialize
  // note P is the sum of squares 1 + 2^2 + 4^2 + ... + (n/2)^2
  const wlen = Math.ceil(W.length/2);
  const plen = wlen*(wlen+1)*(2*wlen+1)/6;
  const P = new Float32Array(plen);//[];
  //P.length = plen;
  // prefill to avoid one step
  //P.fill(1);
  // iterator for P
  let k = -1;
  for (let i=0; i<=m-1; i++) {
    // iterate from lower, right corner up and to the left
    // this is to produce P in a sequence that
    // can be simply iterated over in the matching step
    // else Pm_11 ... Pm_nn | ... | P2_11 P2_21 P2_12 P2_22 | P1_11
    // instead of more easily Pm_11 ... Pm_nn | ... | P2_22 P2_12 P2_21 P2_11 | P1_11

    //console.time(`iter ${n-2*i-2}`)

    //let positions = [];
    //console.log(`i=${i}`);
    // (let y=m-i; y--;)  can replace (let y=m-i-1; y>=0; y -= 1)
    const shift = (n+1)*i;
    for (let x=m-i; x--;) {
      for (let y=m-i; y--;) {
        // increase iterator
        k++;
        const pos = 2*(x*n + y) + shift;
        //positions.push(pos);

        const I1 = W_im[pos];
        const I3 = W_im[pos+1];
        const I2 = W_im[pos+n];
        const I4 = W_im[pos+n+1];

        const b = I1 + I4;
        const b23 = I2 + I3;

        if (b23 > b) {
          W_im[pos] *= -1;
          W_im[pos+1] = I2 - b;
          W_im[pos+n] = I3 - b;
          W_im[pos+n+1] *= -1;

          const temp = W_real[pos+1];
          //const D = W_real[pos] * W_real[pos+n+1];
          const r1 = 1/W_real[pos];
          const r2 = 1/W_real[pos+n+1];
          W_real[pos+1] = W_real[pos+n]*r1*r2; ///D;
          W_real[pos+n] = temp*r1*r2; ///D;
          W_real[pos] = r1;//1/W_real[pos];
          W_real[pos+n+1] = r2;//1/W_real[pos+n+1];

          P[k] = 1;
        } else if (b == b23) {
          W_im[pos] *= -1;
          W_im[pos+1] *= -1;
          W_im[pos+n] *= -1;
          W_im[pos+n+1] *= -1;

          const R1 = W_real[pos];
          const R3 = W_real[pos+1];
          const R2 = W_real[pos+n];
          const R4 = W_real[pos+n+1];

          let D = R1 * R4 + R2 * R3;

          W_real[pos] = R4 / D;
          W_real[pos+1] = R2 / D;
          W_real[pos+n] = R3 / D;
          W_real[pos+n+1] = R1 / D;

          P[k] = (R1 * R4) / D;
        } else {
          W_im[pos] = I4 - b23;
          W_im[pos+1] *= -1;
          W_im[pos+n] *= -1;
          W_im[pos+n+1] = I1 - b23;

          const temp = W_real[pos];
          //const D = W_real[pos+1] * W_real[pos+n];
          const r3 = 1 / W_real[pos+1];
          const r2 = 1 / W_real[pos+n];
          W_real[pos] = W_real[pos+n+1] * r2 * r3;// D;
          W_real[pos+n+1] = temp * r2 * r3; // D;
          W_real[pos+1] = r3;
          W_real[pos+n] = r2;
        }
      }
    }
    //console.log(positions);
    // console.log(W_real);
    // console.log(W_im);
    //
    // console.log(`izero: ${izero}`);
    // console.timeEnd(`iter ${n-2*i-2}`);
  }
  //console.log(P);
  return P;
}

function Matching(P,n) {
  // create empty (n+2)x(n+2) matrix M. We pad by 1 to simplify algorithm
  // at corners. The padding is then stripped away at the end
  const M = new Uint8Array((n+2)*(n+2));
  const m = n/2;
  let k = 0;
  let ns = n+2;
  const plen = P.length;

  // let creationtime = 0;
  // let deletiontime = 0;

  for (let i = 0; i<=m; i++) {
    // store 'active' cells that need to be filled in the creation step
    // const Mcells = [];
    // let bndFirst = m-i+1;
    // let bndLast = m+i-1;
    // iterate over cells to match, from top-left,
    // columnwise down and then one step right
    const shift = (1+ns)*(m-i+1);

    // which cells are for creation Mc
    const Mc = [];
    // let d0 = performance.now();
    for (let x=0; x<=2*(i-1); x += 2) {
      for (let y=0; y<=2*(i-1); y += 2) {
            //k++;
            const pos = x * ns + y + shift;

            // if (M[pos] && M[pos + ns + 1]) {
            //   M[pos] = 0;
            //   M[pos + ns +1] = 0;
            //   Mc.push(x,y);
            // } else if (M[pos + ns] && M[pos+1]) {
            //   M[pos + ns] = 0;
            //   M[pos+1] = 0;
            //   Mc.push(x,y);
            // } else if (M[pos]) {
            //   M[pos] = 0;
            //   M[pos + ns +1] = 1;
            // } else if (M[pos + ns +1]) {
            //   M[pos] = 1;
            //   M[pos + ns +1] = 0;
            // } else if (M[pos + ns]) {
            //   M[pos + ns] = 0;
            //   M[pos+1] = 1;
            // } else if (M[pos+1]) {
            //   M[pos + ns] = 1;
            //   M[pos+1] = 0;
            // } else {
            //   Mc.push(x,y);
            // }
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
                    //if (M[pos - ns]) { }
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

    // deletiontime += performance.now() - d0;
    // let c0 = performance.now();
    // the creation step, fill using Mcells
    for (let r=0, mlen = Mc.length; r<mlen; r+= 2) {
        // get location
        //const pos = Mc[r];
        const x = Mc[r];
        const y = Mc[r+1];
        const pos = x * ns + y + shift;
        //if (i < 4) { console.log([ktest, Mc[r+1]])}
        // check if cells below/to the left have been filled
        // note: creation step depends on order of filling
        //if (!(M[pos - 1] || M[pos - ns] ||  M[pos + 2*ns] || M[pos + ns - 1])) {
        if (!(M[pos - 1] || M[pos - ns] ||  M[pos + 2] || M[pos + ns - 1])) {
            // randomly assign new matching according to weight calculated in P
            //if (Math.random() < P[plen-Mc[r+1]]) {
            const k = plen - (y/2*i + x/2 + 1 + (i-1)*i*(2*i-1)/6);
            //if (Math.random() < P[plen-k]) {
            if (Math.random() < P[k]) {
                M[pos] = 1;
                M[pos + ns + 1] = 1;
            } else {
                M[pos + 1] = 1;
                M[pos + ns] = 1;
            }
        }
    }


    // creationtime += performance.now() - c0;
  }
  // console.log(deletiontime);
  // console.log(creationtime);
  // strip away the padding and invert in y-axis
  // one could also avoid this and re-define drawHexagon to skip padding
  // or just return the matching in the corner.
  const Mnew = [];
  for (let i=n; i>=1; i--) {
    const Mrow = new Uint8Array(n);
    for (let j=1; j<=n; j++) {
      Mrow[j-1] = M[i * ns + j];
    }
    Mnew.push(Mrow);
  }
  return Mnew;
}

function Coloring(P,n) {
  const C = new Float32Array((n+2)*(n+2));
  const m = n/2;
  let ns = n+2;
  let plen = P.length;

  for (let i = 0; i<=m; i++) {
    // iterate over cells to match, from top-left,
    // columnwise down and then one step right
    const shift = (1+ns)*(m-i+1);
    for (let x=0; x<=2*(i-1); x += 2) {
      for (let y=0; y<=2*(i-1); y += 2) {
            const pos = x * ns + y + shift;
            const p = C[pos];
            const q = C[pos + 1];
            const r = C[pos + ns];
            const s = C[pos + ns + 1];

            const deficit = 1-p-q-r-s;
            // note bias = wz/(wz+xy)
            const k = plen - (y/2*i + x/2 + 1 + (i-1)*i*(2*i-1)/6);
            const bias = P[k];

            C[pos]        = s + deficit*bias;
            C[pos + 1]    = r + deficit*(1-bias);
            C[pos + ns]    = q + deficit*(1-bias);
            C[pos + ns +1] = p + deficit*bias;

        }
    }
  }

  const Mnew = [];
  for (let i=n; i>=1; i--) {
    const Mrow = new Float64Array(n);
    for (let j=1; j<=n; j++) {
      Mrow[j-1] = C[i * ns + j];
    }
    Mnew.push(Mrow);
  }
  return Mnew;
}


export {Reduction, Matching, Coloring};
