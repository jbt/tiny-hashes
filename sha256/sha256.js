var i = 1,
  j,
  K = [],
  H = [];

while (++i < 18) {
  for (j = i * i; j < 312; j += i) {
    K[j] = 1;
  }
}

function a(num, root) {
  return (Math.pow(num, 1 / root) % 1) * 4294967296|0;
}

for (i = 1, j = 0; i < 313;) {
  if (!K[++i]) {
    H[j] = a(i, 2);
    K[j++] = a(i, 3);
  }
}

function S(X, n) {
  return (X >>> n) | (X << (32 - n));
}

export default function sha256(b) {
  var
    W = [],
    h = H.slice(i = 0, 8),
    words = [],
    s = unescape(encodeURI(b)) + '\x80',
    l = s.length;

  for (; i < l;) {
    words[i >> 2] |= s.charCodeAt(i) << 8 * (3 - i++ % 4);
  }

  words[b = (--l + 8 >> 2) | 15] = l * 8;

  for (i = 0; i < b; i += 16) {
    a = h.slice(j = 0);

    for (; j < 64; a[4] += s) {
      s = 0 |
        (
          W[j] =
            (j < 16)
              ? ~~words[j + i]
              : (S(l = W[j - 2], 17) ^ S(l, 19) ^ (l >>> 10)) +
                W[j - 7] +
                (S(l = W[j - 15], 7) ^ S(l, 18) ^ (l >>> 3)) +
                W[j - 16]

        ) +
        a.pop() +
        (S(l = a[4], 6) ^ S(l, 11) ^ S(l, 25)) +
        ((l & a[5]) ^ (~l & a[6])) +
        K[j++];

      a.unshift(
        s +
        (S(l = a[0], 2) ^ S(l, 13) ^ S(l, 22)) +
        ((l & a[1]) ^ (a[1] & a[2]) ^ (a[2] & l))
      );
    }

    for (j = 8; j;) h[--j] += a[j];
  }

  for (s = ''; j < 64;) {
    s += ((h[j >> 3] >> 4 * (7 - j++ % 8)) & 15).toString(16);
  }

  return s;
}
