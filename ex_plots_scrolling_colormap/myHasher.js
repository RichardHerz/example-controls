function fHashit() {
  let ms = document.getElementById('textarea_enter_message').value;
  let h = fMD2(ms);
  document.getElementById('field_hash_result').innerHTML = h;
  // jQuery JS library needs to have been loaded for this to work
  $.post("../webAppRunLog.lc",{webAppNumber: "17, cryptographic hash"});

function fCopyit() {
  let ms = document.getElementById('textarea_enter_message').value;
  let h = document.getElementById('field_hash_result').innerHTML;
  // sometimes contents not being completely replaced on a second copy
  // so try to completely clear them first...
  document.getElementById('field_message_COPY').innerHTML = '';
  document.getElementById('field_hash_result_COPY').innerHTML = '';
  document.getElementById('field_message_COPY').innerHTML = ms;
  document.getElementById('field_hash_result_COPY').innerHTML = h;
} // END of function copyit

function fClearHash() {
  document.getElementById('field_hash_result').innerHTML = '';
}

function fMD2(ms) {
  // returns MD2 hash of ms
  /*
  by Richard K. Herz, https://github.com/RichardHerz
  implement MD2 hash in JavaScript
  use algorithm from  https://tools.ietf.org/html/rfc1319
  ...
  hash functions are the key to blockchains
  ...
  confusion and diffusion are key to hash functions, per Claude Shannon info theory,
  where confusion means hash can't be related directly back to message, and where
  diffusion means change in one bit in message affects many bits in hash
  at different locations
  ...
  XOR of message with random numbers in S array provides confusion in MD2
  ...
  using result at one location (of message or X working array in MD2 Step 4) to get
  next values to XOR and put in another location adds diffusion 
  ...
  padding message so it's a multiple of the number of bytes N in the hash allows
  long message to be hashed to fixed length - each N-byte  block of message can
  get processed with result contributing to the N-byte hash
  ...
  In Step 2 below, each message byte is XOR'd with a random number
  from array S (pseudo-random numbers from pi) then assign that result to byte in "checksum" C array
  AND use that number as new index from which to get the next byte in S to XOR with the next message byte.
  ...
  Maybe can think of this is random encoding of a message byte using a new seed each time that is related
  to the message byte, thus relating next byte in hash in some way to previous byte, thus, ensuring that
  the sequence of message bytes is important? You seem to be using message info in process of randomly
  jumping around S array of random numbers to get a value to XOR with message to encode it...
  ...
  In Step 4, in each loop on i (outer loop), you copy one 16-byte message block (of all message blocks
  with C from above appended) to the 2nd block of 3-block array X, then XOR that message block with 1st block
  of X, which, after 1st msg block processed has info from previous msg blocks, and copy to 3rd block of X.
  Then, in loop j, for each i in innermost loop on i, you XOR a byte in X with a byte in S and
  assign the result back to the byte location in X AND use the result as the next value of
  index t for S[t] to process the next byte of X. Info from the original message block in 2nd block of X gets
  propagated down X and then "wraps around" to the 1st block of X as t is used in next of 18 times this process
  is run in loop on j (S is limited to 256 bytes, so modulo t to get back to 0-255). So info about
  the message gets shifted around X such that the final MD2 hash is taken from the 1st block of X.
  */

  // 256-byte 'S table' from
  //     https://en.wikipedia.org/wiki/MD2_(hash_function)
  // S provides Shannon’s “confusion” by mixing random info with the message
  // note: S[0] is returned as 41, which is the decimal equiv of hex 0x29
  // there are S[0] to S[255] = 256 values listed ranging in value from
  //     0x00 = 0 to 0xFF = 255 with no values repeated
  let S = [0x29, 0x2E, 0x43, 0xC9, 0xA2, 0xD8, 0x7C, 0x01, 0x3D, 0x36, 0x54, 0xA1, 0xEC, 0xF0, 0x06, 0x13,
            0x62, 0xA7, 0x05, 0xF3, 0xC0, 0xC7, 0x73, 0x8C, 0x98, 0x93, 0x2B, 0xD9, 0xBC, 0x4C, 0x82, 0xCA,
            0x1E, 0x9B, 0x57, 0x3C, 0xFD, 0xD4, 0xE0, 0x16, 0x67, 0x42, 0x6F, 0x18, 0x8A, 0x17, 0xE5, 0x12,
            0xBE, 0x4E, 0xC4, 0xD6, 0xDA, 0x9E, 0xDE, 0x49, 0xA0, 0xFB, 0xF5, 0x8E, 0xBB, 0x2F, 0xEE, 0x7A,
            0xA9, 0x68, 0x79, 0x91, 0x15, 0xB2, 0x07, 0x3F, 0x94, 0xC2, 0x10, 0x89, 0x0B, 0x22, 0x5F, 0x21,
            0x80, 0x7F, 0x5D, 0x9A, 0x5A, 0x90, 0x32, 0x27, 0x35, 0x3E, 0xCC, 0xE7, 0xBF, 0xF7, 0x97, 0x03,
            0xFF, 0x19, 0x30, 0xB3, 0x48, 0xA5, 0xB5, 0xD1, 0xD7, 0x5E, 0x92, 0x2A, 0xAC, 0x56, 0xAA, 0xC6,
            0x4F, 0xB8, 0x38, 0xD2, 0x96, 0xA4, 0x7D, 0xB6, 0x76, 0xFC, 0x6B, 0xE2, 0x9C, 0x74, 0x04, 0xF1,
            0x45, 0x9D, 0x70, 0x59, 0x64, 0x71, 0x87, 0x20, 0x86, 0x5B, 0xCF, 0x65, 0xE6, 0x2D, 0xA8, 0x02,
            0x1B, 0x60, 0x25, 0xAD, 0xAE, 0xB0, 0xB9, 0xF6, 0x1C, 0x46, 0x61, 0x69, 0x34, 0x40, 0x7E, 0x0F,
            0x55, 0x47, 0xA3, 0x23, 0xDD, 0x51, 0xAF, 0x3A, 0xC3, 0x5C, 0xF9, 0xCE, 0xBA, 0xC5, 0xEA, 0x26,
            0x2C, 0x53, 0x0D, 0x6E, 0x85, 0x28, 0x84, 0x09, 0xD3, 0xDF, 0xCD, 0xF4, 0x41, 0x81, 0x4D, 0x52,
            0x6A, 0xDC, 0x37, 0xC8, 0x6C, 0xC1, 0xAB, 0xFA, 0x24, 0xE1, 0x7B, 0x08, 0x0C, 0xBD, 0xB1, 0x4A,
            0x78, 0x88, 0x95, 0x8B, 0xE3, 0x63, 0xE8, 0x6D, 0xE9, 0xCB, 0xD5, 0xFE, 0x3B, 0x00, 0x1D, 0x39,
            0xF2, 0xEF, 0xB7, 0x0E, 0x66, 0x58, 0xD0, 0xE4, 0xA6, 0x77, 0x72, 0xF8, 0xEB, 0x75, 0x4B, 0x0A,
            0x31, 0x44, 0x50, 0xB4, 0x8F, 0xED, 0x1F, 0x1A, 0xDB, 0x99, 0x8D, 0x33, 0x9F, 0x11, 0x83, 0x14];

  let hb = 16; // hexadecimal radix (base)
  let md = []; // initialize decimal representation of message
  let cd;

  // console.log('------ ENTER HASHER ---------------- ');

  // convert message string from ASCII char to ASCII decimal array
  // do all processing in decimal, then, at end, convert hash to hex string
  for (let i in ms) {
    cd = ms.charCodeAt(i);
    md.push(cd);
    // if (i < 4) {
    //   console.log('i = ' + i);
    //   console.log('ms[i] = ' + ms[i]);
    //   console.log('cd = ' + cd);
    // }
  }

  // "Step 1. Append Padding Bytes" -----------------------

  // append "i" bytes of value "i" to get mod 0
  // but add at least one byte
  let mdl = md.length;
  let mdlmod = mdl % hb;
  let p = hb - mdlmod;
  for (let i = 0; i < p; i++) {
    md.push(p);
  }

  // "Step 2. Append Checksum" ----------------------------

  // clear checksum C
  let C = [];
  for (let i = 0; i < hb; i++) {
    C[i] = 0;
  }
  let L = 0;
  // get new length, changed after padding
  mdl = md.length;
  let N = mdl / hb;

// console.log('>> ENTER APPEND CHECKSUM << ')

  for (let i = 0; i < N; i++) {
    for (let j=0; j < hb; j++) {
      // see  https://decimaltobinary.pro/
      // ^ is bitwise XOR in JavaScript
      C[j] = S[md[i*hb+j] ^ L];

// console.log('i, j, i*hb+j = ' + i +', '+ j + ', ' + i*hb+j);
// console.log('md[i*hb+j]  = ' + md[i*hb+j]);
// console.log('L = ' + L);
// console.log('C[j] = S[md[i*hb+j] ^ L] = ' + C[j]);


      L = C[j];
    }
  }

  // message info goes into L and keeps moving right (higher i,j)
  // mixing message info on left with info on right but
  // numbers are only permanent in C from ops with last block in message,
  // which, in some cases may be almost all padding

  // append C to message
  md = md.concat(C);

  // "Step 3. Initialize MD Buffer" -----------------------

  // "A 48-byte buffer X is used to compute the message digest. The buffer
  //  is initialized to zero."
  // note 48 = 3*16, so X is three 16-byte blocks
  // the first 16-byte block ends up being the final MD2 hash

  let X = [];
  for (let i = 0; i < 48; i++) {
    X[i] = 0;
  }

  // "Step 4. Process Message in 16-Byte Blocks" ----------

  // get new length, changed after appending checksum C
  mdl = md.length;
  N = mdl / hb;

  // "Process each 16-byte block"
  for (let i = 0; i < N; i++) {

    // "Copy block i into X"
    //
    // "For j = 0 to 15 do
    //    Set X[16+j] to M[i*16+j].
    //    Set X[32+j] to (X[16+j] xor X[j]).
    //  end"

    for (let j = 0; j < hb; j++) {
      X[hb+j] = md[i*hb+j];
      X[2*hb+j] = X[hb+j] ^ X[j];
    }

    // "Set t to 0"
    let t = 0;

    // "Do 18 rounds."

    for (let j = 0; j < 18; j++) {

      // "For k = 0 to 47 do
      //    Set t and X[k] to (X[k] xor S[t]).
      // end /* of loop on k */"

      for (let k = 0; k < 48; k++) {
        X[k] = X[k] ^ S[t];
        t = X[k];
      } // end of loop on k

      // "Set t to (t+j) modulo 256"

      t = (t+j) % 256;

    } // end of loop on j

  } // end of loop on i

  // "Step 5. Output" -------------------------------------

  // "The message digest produced as output is X[0 ... 15]. That is, we
  //  begin with X[0], and end with X[15]"

  let MD2d = X.slice(0,hb);
  let MD2 = '';
  let ch;
  // convert decimal MD2d array to hex string MD2
  for (let i = 0; i < hb; i++) {
    ch = MD2d[i].toString(hb);
    if (MD2d[i] < hb ) {
      ch = '0' + ch;
    }
    MD2 += ch;
  }

  return MD2;
} // END of fMD2

function fMiner(m,b,ph) {
  let mn;
  let h;
  let s;
  let z = '0000000000';
  let nz = 4; // # zeros needed at start of hash
  let zz;
  for (let i = 0; i < 300000; i++) {
    // i is our mining nonce
    mn ='block number: ' + b + '\n';
    mn += 'nonce: ' + i.toString() + '\n'
    mn +='previous hash: ' + ph + '\n';
    mn += m;
    h = fMD2(mn);
    s = h.slice(0,nz);
    zz = z.slice(0,nz);
    if (s == zz) {
      // console.log('break');
      break;
    } // END of if
  } // END of for
  return [mn, h];
} // END of function fMiner()
