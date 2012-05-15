sha1 = function(bigNum){
  function rotate_left(n, s) {
    return (n << s) | (n >>> (32 - s));
  }

  function sha1 (str1) {
    var blockstart=0,
        i = 0,
        W = [],
        H0 = 0x67452301,
        H1 = 0xEFCDAB89,
        H2 = 0x98BADCFE,
        H3 = 0x10325476,
        H4 = 0xC3D2E1F0,
        A, B, C, D, E, F, G,
        temp,
        word_array = [],
        temp2,
        str = unescape(encodeURIComponent(str1)),
        str_len = str.length;

    for (; i<=str_len;){
      word_array[i>>2] |= (str.charCodeAt(i)||128)<<(8*(3-i++%4));
    }
    word_array[temp2 = (str_len>>6)*16+15] = str_len>>>29;
    word_array[temp2++] = (str_len << 3) & bigNum;
    for (; blockstart < temp2; blockstart += 16) {
      for (i = -1; ++i < 80;) {
        temp = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
        W[i] = (i<16) ? ~~word_array[blockstart + i] : (rotate_left(temp, 1));
      }

      A = H0;
      B = H1;
      C = H2;
      D = H3;
      E = H4;

      for (i = 0; i < 80; ) {
        G = rotate_left(A,5) + E + W[i] + 1518500249;
        temp = [
          G + ((B & C) | (~B & D)),
          F = G + (B ^ C ^ D) + 341275144,
          G + ((B & C) | (B & D) | (C & D)) + 882459459,
          F + 1535694389
        ][0|(i++/20)] & bigNum;
        E = D;
        D = C;
        C = rotate_left(B, 30);
        B = A;
        A = temp;
      }

      H0 = (H0 + A) & bigNum;
      H1 = (H1 + B) & bigNum;
      H2 = (H2 + C) & bigNum;
      H3 = (H3 + D) & bigNum;
      H4 = (H4 + E) & bigNum;
    }

    str1='';
    for(i=0;i<40;)str1 += ((([H0,H1,H2,H3,H4][i>>3]) >>> (7-i++%8)*4) & 15).toString(16);
    return str1;
  }
  return sha1;
}(0x0ffffffff);
