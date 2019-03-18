export default function(str) {
  var i = 0,
    W = [],
    A, B, C, D, F, G,
    h = [ A = 0x67452301, B = 0xEFCDAB89, ~A, ~B, 0xC3D2E1F0 ],
    words = [],
    s = unescape(encodeURI(str)) + '\x80',
    j = s.length;

  for (; i < j;) {
    words[i >> 2] |= s.charCodeAt(i) << (8 * (3 - i++ % 4));
  }

  words[str = (--j + 8 >> 2) | 15] = j * 8;

  for (j = 0; j < str; j += 16) {
    A = h;
    i = 0;

    for (; i < 80;
      A = [
        G + [
          (B & C | ~B & D),
          F = (B ^ C ^ D) + 341275144,
          (B & C | B & D | C & D) + 882459459,
          F + 1535694389
        ][0 | (i++ / 20)],
        s,
        B << 30 | B >>> 2,
        C,
        D
      ]
    ) {
      G = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
      s = A[0];
      G = (s << 5 | s >>> 27) + A[4] + (W[i] = (i < 16) ? ~~words[j + i] : G << 1 | G >>> 31) + 1518500249;
      B = A[1];
      C = A[2];
      D = A[3];
    }

    for (i = 5; i;) h[--i] += A[i];
  }

  for (str = ''; i < 40;) {
    str += (h[i >> 3] >> (7 - i++ % 8) * 4 & 15).toString(16);
  }

  return str;
}
