sha256 = function(sixteen, ffff,length){


  // Eratosthenes seive to find primes up to 311 for magic constants. This is why SHA256 is better than SHA1
  var ints=[],i=1,j,primes=[],idx=64,K=[];
  while(++i<18)if(!ints[i])for(j=i*i;j<312;j+=i)ints[j]=1;
  for(i=1;i<313;)if(!ints[++i])primes.push(i);
  function x(num,root){
    var x = Math.pow(num,1/root);
    return 0|((x-~~x)*4294967296)
  }
  for(;idx--;)K[idx]=x(primes[idx],3);

  function add (x, y) {
    var lsw = (x & ffff) + (y & ffff);
    var msw = (x >> sixteen) + (y >> sixteen) + (lsw >> sixteen);
    return (msw << sixteen) | (lsw & ffff);
  }

  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }

  function SHA256(s){

    function core_sha256 (m, l) {
      var HASH = [], W = [],
          a, b, c, d, e, f, g, h, i, j, T1, T2, y;
      for(idx=8;idx--;)HASH[idx]=x(primes[idx],2);

      m[l >> 5] |= 0x80 << (24 - l % 32);
      m[((l + 64 >> 9) << 4) + 15] = l;

      for ( i = 0; i<m[length]; i+=sixteen ) {
        a = HASH[0];
        b = HASH[1];
        c = HASH[2];
        d = HASH[3];
        e = HASH[4];
        f = HASH[5];
        g = HASH[6];
        h = HASH[7];

        for ( j = 0; j<64;) {
          if (j < sixteen) W[j] = m[j + i];
          else W[j] = add(
            add(S(y=W[j-2],17) ^ S(y,19) ^ (y>>>10),   W[j - 7]),
            add(S(y=W[j-15],7) ^ S(y,18) ^ (y>>>3),   W[j - sixteen])
          );

          T1 = add(
            add(
              add(h,  S(e,6) ^ S(e,11) ^ S(e,25)),
              add((e&f) ^ ((~e)&g),  K[j])
            ),
            W[j++]
          );
          T2 = add(S(a,2) ^ S(a,13) ^ S(a,22),  (a&b) ^ (b&c) ^ (c&a));

          h = g;
          g = f;
          f = e;
          e = add(d, T1);
          d = c;
          c = b;
          b = a;
          a = add(T1, T2);
        }

        HASH[0] = add(a, HASH[0]);
        HASH[1] = add(b, HASH[1]);
        HASH[2] = add(c, HASH[2]);
        HASH[3] = add(d, HASH[3]);
        HASH[4] = add(e, HASH[4]);
        HASH[5] = add(f, HASH[5]);
        HASH[6] = add(g, HASH[6]);
        HASH[7] = add(h, HASH[7]);
      }
      return HASH;
    }

    function str2binb (str,bin,i) {
      for(; i < str[length];) {
        bin[i>>2] |= (str.charCodeAt(i) & 0xff) << 8*(3 - i++%4);
      }
      return bin;
    }

    function binb2hex (binarray,str,i) {
      for(; i < 32;) {
        str += ((256|(binarray[i>>2] >> ((3 - i++%4)*8)) & 511)).toString(sixteen).slice(1);
      }
      return str;
    }

    s = unescape(encodeURIComponent(s));
    return binb2hex(core_sha256(str2binb(s,[],0), s[length] * 8),'',0);

  }
  return SHA256;
}(16,0xffff,'length');
