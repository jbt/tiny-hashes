sha1 = function(bigNum){
	function rotate_left(n, s) {
		return  (n << s) | (n >>> (32 - s));
	}

	function cvt_hex(val,str,i) {
		str = "";
		for (i = 8; i--;) {
			str += ((val >>> (i * 4)) & 15).toString(16);
		}
		return str;
	}

	function sha1 (str1) {
		

		var blockstart=0;
		var i = 0;
		var W = [];
		var H0 = 0x67452301;
		var H1 = 0xEFCDAB89;
		var H2 = 0x98BADCFE;
		var H3 = 0x10325476;
		var H4 = 0xC3D2E1F0;
		var A, B, C, D, E, F, G, H;
		var temp;
		var word_array = [];
		var temp2;

		var str = unescape(encodeURIComponent(str1));
		var str_len = str.length;

		for (; i<=str_len;){
			word_array[i>>2] |= (str.charCodeAt(i)||128)<<(8*(3-i++%4));
		}
		temp2 = (str_len>>6)*16+14;
		word_array[temp2++] = str_len>>>29;
		word_array[temp2++] = (str_len << 3) & bigNum
		for (; blockstart < temp2; blockstart += 16) {
			for (i = -1; ++i < 80;) {
				temp = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]
				W[i] = (i<16) ? ~~word_array[blockstart + i] : (rotate_left(temp, 1));
			}

			A = H0;
			B = H1;
			C = H2;
			D = H3;
			E = H4;

			for (i = 0; i < 80; ) {
				G = rotate_left(A,5);
				H = E + W[i] + 1518500249;
				temp = [
					G + ((B & C) | (~B & D)) + H,
					F = G + (B ^ C ^ D) + H + 341275144,
					G + ((B & C) | (B & D) | (C & D)) + H + 882459459,
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

		return cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
	}
	return sha1
}(0x0ffffffff)
