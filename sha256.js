sha256 = function(sixteen, ffff,length,fifteen){

function SHA256(s){
 
	var chrsz   = 8;
	
	// Eratosthenes seive to find primes up to 311 for magic constants. This is why SHA256 is better than SHA1
	var ints=[],i=1,j,primes=[];
	while(++i<18)if(!ints[i])for(j=i*i;j<312;j+=i)ints[j]=1;
	for(i=1;i<313;)if(!ints[++i])primes.push(i);
 
	var K = [];
	function x(num,root){
		var x = Math.pow(num,1/root);
		return 0|((x-~~x)*4294967296)
	}
	for(var idx = 64; idx--;)K[idx]=x(primes[idx],3);
		
 
	function safe_add (x, y) {
		var lsw = (x & ffff) + (y & ffff);
		var msw = (x >> sixteen) + (y >> sixteen) + (lsw >> sixteen);
		return (msw << sixteen) | (lsw & ffff);
	}
 
	function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
	function R (X, n) { return ( X >>> n ); }
	function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
	function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
	function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
	function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
	function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
	function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
 
	function core_sha256 (m, l) {
		var HASH = [];
		for(idx=8;idx--;)HASH[idx]=x(primes[idx],2);
		var W = [];
		var a, b, c, d, e, f, g, h, i, j;
		var T1, T2;
 
		m[l >> 5] |= 0x80 << (24 - l % 32);
		m[((l + 64 >> 9) << 4) + fifteen] = l;
 
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
				else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - fifteen])), W[j - sixteen]);
 
				T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j++]);
				T2 = safe_add(Sigma0256(a), Maj(a, b, c));
 
				h = g;
				g = f;
				f = e;
				e = safe_add(d, T1);
				d = c;
				c = b;
				b = a;
				a = safe_add(T1, T2);
			}
 
			HASH[0] = safe_add(a, HASH[0]);
			HASH[1] = safe_add(b, HASH[1]);
			HASH[2] = safe_add(c, HASH[2]);
			HASH[3] = safe_add(d, HASH[3]);
			HASH[4] = safe_add(e, HASH[4]);
			HASH[5] = safe_add(f, HASH[5]);
			HASH[6] = safe_add(g, HASH[6]);
			HASH[7] = safe_add(h, HASH[7]);
		}
		return HASH;
	}
 
	function str2binb (str,bin,mask,i) {
		bin = [];
		mask = (1 << chrsz) - 1;
		for(i = 0; i < str[length] * chrsz; i += chrsz) {
			bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
		}
		return bin;
	}
 
	function Utf8Encode(string) {return unescape(encodeURIComponent(string))}
 
	function binb2hex (binarray,str,i) {
		str = "";
		for(i = 0; i < 32;) {
			str += (((binarray[i>>2] >> ((3 - i%4)*8+4)) & fifteen)).toString(sixteen)+
			((binarray[i>>2] >> ((3 - i++%4)*8  )) & fifteen).toString(sixteen);
		}
		return str;
	}
 
	s = Utf8Encode(s);
	return binb2hex(core_sha256(str2binb(s), s[length] * chrsz));
 
}
return SHA256
}(16,0xffff,'length',15);