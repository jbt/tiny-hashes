md5 = function(sixteen,ffff){

  var k = [],i=0;

  for(;i<64;){
    k[i] = 0|(Math.abs(Math.sin(++i)) * 4294967296);
  }

  function add(x, y){
    var msw = (x >> sixteen) + (y >> sixteen) + ((y=(x & ffff) + (y & ffff)) >> sixteen);
    return (msw << sixteen) | (y & ffff);
  }
  function rol(num, cnt){
    return (num << cnt)|(num >>> (32 - cnt));
  }


  var calcMD5 = function(str){
    var b,c,d,f,j,m,
        x = [],
        str2 = unescape(encodeURIComponent(str)),
        a = str2.length,
        h = [b=1732584193,c=-271733879,~b,~c],
        i=0;

    for(;i<=a;) x[i >> 2] |= (str2.charCodeAt(i)||128) << ((i++ % 4) * 8);
    x[str=((a+ 8) >> 6)*sixteen+14] = a * 8;
    i = 0;

    for(; i < str; i += sixteen){
      a = h.slice(j=0);
      for(;j<64;){
        a = [
          d = a[3],
          add( b = a[1] ,
            rol(add(
              add(
                a[0],
                [
                  ((b&(c=a[2]))|((~b)&d)),
                  ((d&b)|((~d)&c)),
                  (b^c^d),
                  (c^(b|(~d)))
                ][m=j>>4]
              ),
              add(
                k[j],
                x[[
                  j,
                  (5*j+1),
                  (3*j+5),
                  (7*j)
                ][m]%sixteen+i]
              )
            ),[
              7, 12, 17, 22,
              5,  9, 14, 20,
              4, 11, sixteen, 23,
              6, 10, 15, 21
            ][4*m+j++%4]
          )),
          b,
          c
        ];
      }
      for(j=4;j;) h[--j] = add(h[j], a[j]);
    }

    str = '';
    for(;j<16;) str += (256|(h[j>>2] >> ((j++%4) * 8)) & 0x1FF).toString(sixteen).slice(1);

    return str;
  };
  return calcMD5;
}(16,0xffff);
