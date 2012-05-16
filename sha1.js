sha1 =  function (str1) {
  function rotate_left(n, s) {
    return (n << s) | (n >>> (32 - s));
  }
  var blockstart=0,
      i = 0,
      W = [],
      H = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],
      A, B, C, D, F, G,
      temp2,
      str = unescape(encodeURIComponent(str1)),
      str_len = str.length;

  for (; i<=str_len;){
    W[i>>2] |= (str.charCodeAt(i)||128)<<(8*(3-i++%4));
  }
  W[temp2 = (str_len>>6)*16+14] = str_len>>29;
  W[++temp2] = (str_len << 3);
  for (; blockstart <= temp2; blockstart += 16) {
    A = H.slice(i=0);

    for (; i < 80; A = [G, A[0], rotate_left(B, 30), C, D]) {
      G = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      G = rotate_left(A[0],5) + A[4] + (W[i] = (i<16) ? ~~W[blockstart + i] : (rotate_left(G, 1))) + 1518500249;
      G = [
        G + (((B=A[1]) & (C=A[2])) | (~B & (D=A[3]))),
        F = G + (B ^ C ^ D) + 341275144,
        G + ((B & C) | (B & D) | (C & D)) + 882459459,
        F + 1535694389
      ][0|(i++/20)] << 0;
    }

    for(i=5;i;) H[--i] = (H[i] + A[i]) << 0;
  }

  for(str1='';i<40;)str1 += (((H[i>>3]) >> (7-i++%8)*4) & 15).toString(16);
  return str1;
};
