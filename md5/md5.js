var k = [], i = 0;

for (; i < 64;) {
  k[i] = 0 | (Math.abs(Math.sin(++i)) * 4294967296);
}

export default function md5(str) {
  var b, c, d = 0,
    h = [ b = 1732584193, c = -271733879, ~b, ~c ],
    words = [],
    j = unescape(encodeURI(str)) + '\x80',
    a = j.length;

  for (; d < a;) {
    words[d >> 2] |= j.charCodeAt(d) << 8 * (d++ % 4);
  }

  str = (--a + 8 >> 2) | 15;
  words[--str] = a * 8;

  i = j = 0;

  for (; i < str; i += 16) {
    a = h;

    for (; j < 64;) {
      a = [
        d = a[3],
        (
          (b = a[1]|0) +
          ((d =
            a[0] +
            [
              b & (c = a[2]) | ~b & d,
              d & b | ~d & c,
              b ^ c ^ d,
              c ^ (b | ~d)
            ][a = j >> 4] +
            k[j] +
            ~~words[[
              j,
              5 * j + 1,
              3 * j + 5,
              7 * j
            ][a] % 16 + i]
          ) << (a = [
            7, 12, 17, 22,
            5,  9, 14, 20,
            4, 11, 16, 23,
            6, 10, 15, 21
          ][4 * a + j++ % 4]) | d >>> 32 - a)
        ),
        b,
        c
      ];
    }

    for (j = 4; j;) h[--j] += a[j];
  }

  for (str = ''; j < 32;) {
    str += ((h[j >> 3] >> ((1 ^ j++ & 7) * 4)) & 15).toString(16);
  }

  return str;
}
