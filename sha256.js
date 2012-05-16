sha256 = function(ffff){


  // Eratosthenes seive to find primes up to 311 for magic constants. This is why SHA256 is better than SHA1
  var i=1,
      j,
      K=[],
      H=[],
      sixteen=16;

  while(++i<18)
    for(j=i*i;j<312;j+=i)
      H[j]=1;

  function x(num,root,y){
    y = Math.pow(num,1/root);
    return(y-~~y)*4294967296|0;
  }

  for(i=1,j=0;i<313;)
    if(!H[++i])
      H[j]=x(i,2), K[j++]=x(i,3);

  function add(x, y){
    var msw = (x >> sixteen) + (y >> sixteen) + ((y=(x & ffff) + (y & ffff)) >> sixteen);
    return (msw << sixteen) | (y & ffff);
  }

  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }

  function SHA256(b){
    var HASH = H.slice(i=0), s = unescape(encodeURIComponent(b)), W = [], l = s.length, m = [],
        a, y,z;
    for(;i<l;) m[i>>2] |= (s.charCodeAt(i) & 0xff) << 8*(3 - i++%4);

    l *= 8;

    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[z=((l + 64 >> 9) << 4) + 15] = l;

    for (i=0 ; i<z; i+=sixteen ) {
      a = HASH.slice(j=0,8);

      for (; j<64;) {
        if (j < sixteen) W[j] = m[j + i];
        else W[j] = add(
          add(S(y=W[j-2],17) ^ S(y,19) ^ (y>>>10),   W[j - 7]),
          add(S(y=W[j-15],7) ^ S(y,18) ^ (y>>>3),   W[j - sixteen])
        );

        a.unshift(
          add(
            y=add(
              add(
                add(a.pop(),  S(b=a[4],6) ^ S(b,11) ^ S(b,25)),
                add((b&a[5]) ^ ((~b)&a[6]),  K[j])
              ),
              W[j++]
            ),
            add(S(l=a[0],2) ^ S(l,13) ^ S(l,22),  (l&a[1]) ^ (a[1]&a[2]) ^ (a[2]&l))
          )
        );
        a[4] = add(a[4],y);
      }

      for(j=8;j--;) HASH[j] = add(a[j],HASH[j]);
    }

    for(s='';j<63;) s += ((HASH[++j>>3]>>4*(7-j%8))&15).toString(sixteen);

    return s;

  }
  return SHA256;
}(0xffff);
