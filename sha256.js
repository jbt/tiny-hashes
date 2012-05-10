sha256 = function(ffff){


  // Eratosthenes seive to find primes up to 311 for magic constants. This is why SHA256 is better than SHA1
  var i=1,j,K=[],H=[],sixteen=16;
  while(++i<18)for(j=i*i;j<312;j+=i)H[j]=1;
  function x(num,root,y){
    y = Math.pow(num,1/root);
    return(y-~~y)*4294967296|0;
  }
  for(i=1,j=0;i<313;)if(!H[++i])H[j]=x(i,2),K[j++]=x(i,3);

  function add(x, y){
    var msw = (x >> sixteen) + (y >> sixteen) + ((y=(x & ffff) + (y & ffff)) >> sixteen);
    return (msw << sixteen) | (y & ffff);
  }

  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }

  function SHA256(str){
    var HASH = H.slice(i=0), s = unescape(encodeURIComponent(str)), W = [], l = s.length, m = [],
        a, b, c, d, e, f, g, h, y,z;
    for(;i<l;) m[i>>2] |= (s.charCodeAt(i) & 0xff) << 8*(3 - i++%4);

    l *= 8;

    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[z=((l + 64 >> 9) << 4) + 15] = l;

    for (i=0 ; i<z; i+=sixteen ) {
      a = HASH[j=0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];

      for (; j<64;) {
        if (j < sixteen) W[j] = m[j + i];
        else W[j] = add(
          add(S(y=W[j-2],17) ^ S(y,19) ^ (y>>>10),   W[j - 7]),
          add(S(y=W[j-15],7) ^ S(y,18) ^ (y>>>3),   W[j - sixteen])
        );
        y = h;
        h = g;
        g = f;
        f = e;
        e = add(
          d,
          y=add(
            add(
              add(y,  S(f,6) ^ S(f,11) ^ S(f,25)),
              add((f&g) ^ ((~f)&h),  K[j])
            ),
            W[j++]
          )
        );
        d = c;
        c = b;
        b = a;
        a = add(y, add(S(a,2) ^ S(a,13) ^ S(a,22),  (a&c) ^ (c&d) ^ (d&a)));
      }

      HASH = [
        add(a, HASH[j=0]),
        add(b, HASH[1]),
        add(c, HASH[2]),
        add(d, HASH[3]),
        add(e, HASH[4]),
        add(f, HASH[5]),
        add(g, HASH[6]),
        add(h, HASH[7])
      ];
    }

    for(s='';j<32;) s += ((256|HASH[j>>2]>>8*((3-j++%4)))&511).toString(sixteen).slice(1);

    return s;

  }
  return SHA256;
}(0xffff);
