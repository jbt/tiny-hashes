#!/usr/bin/env node

require('./sha256');
require('./sha1');
require('./md5');

// test vectors from http://www.bichlmeier.info/sha256test.html
var TEST_SHA256 = [
  ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', ''],
  ['ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad', 'abc'],
  ['f7846f55cf23e14eebeab5b4e1550cad5b509e3348fbc4efa3a1413d393cb650', 'message digest'],
  ['f30ceb2bb2829e79e4ca9753d35a8ecc00262d164cc077080295381cbd643f0d', 'secure hash algorithm'],
  ['6819d915c73f4d1e77e4e1b52d1fa0f9cf9beaead3939f15874bd988e2a23630', 'SHA256 is considered to be safe'],
  ['248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1', 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'],
  ['f08a78cbbaee082b052ae0708f32fa1e50c5c421aa772ba5dbb406a2ea6be342', 'For this sample, this 63-byte string will be used as input data'],
  ['ab64eff7e88e2e46165e29f2bce41826bd4c7b3552f6b382a9e7d3af47c245f8', 'This is exactly 64 bytes long, not counting the terminating byte'],
  ['ccc77ef9bd486f0b619a9b084942a1097eb117f84c88801106e88f5f8065939a', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae cras amet.']
];

var TEST_SHA1 = [
  ['da39a3ee5e6b4b0d3255bfef95601890afd80709', ''],
  ['a9993e364706816aba3e25717850c26c9cd0d89d', 'abc'],
  ['c12252ceda8be8994d5fa0290a47231c1d16aae3', 'message digest'],
  ['d4d6d2f0ebe317513bbd8d967d89bac5819c2f60', 'secure hash algorithm'],
  ['a8cbc8df99e246e35a958aceed0e7bfb32d030e1', 'SHA256 is considered to be saf'],
  ['4f3935d34e561764fbad457fba791468c5882251', 'SHA256 is considered to be safe'],
  ['0a26349c9426f258eafb7501960426b1dc777025', 'SHA256 is considered to be safe.'],
  ['57925eb56d8b64e3a08733f0652e52e7eaab1283', 'SHA256 is considered to be safe..................'],
  ['a9c9fb7c58c19013b03fa729204efd6a3563ea9f', 'SHA256 is considered to be safe...................'],
  ['62e79f3b391f3c8d5b0322db7ba20e01b87ad530', 'SHA256 is considered to be safe....................'],
  ['a61234ae73d8eb1c115742178e649f4d4a78ffcd', 'SHA256 is considered to be safe.....................'],
  ['ed0d318eb5c56ba1ee93c888da719aba032a8445', 'SHA256 is considered to be safe......................'],
  ['84983e441c3bd26ebaae4aa1f95129e5e54670f1', 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'],
  ['4f0ea5cd0585a23d028abdc1a6684e5a8094dc49', 'For this sample, this 63-byte string will be used as input data'],
  ['fb679f23e7d1ce053313e66e127ab1b444397057', 'This is exactly 64 bytes long, not counting the terminating byte'],
  ['f883c779534719386cce66239ba88f4eecc3aede', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae cras amet.'],
  ['da39a3ee5e6b4b0d3255bfef95601890afd80709', ''],
  ['11f6ad8ec52a2984abaafd7c3b516503785c2072', 'x'],
  ['dd7b7b74ea160e049dd128478e074ce47254bde8', 'xx'],
  ['b60d121b438a380c343d5ec3c2037564b82ffef3', 'xxx'],
  ['4ad583af22c2e7d40c1c916b2920299155a46464', 'xxxx'],
  ['9addbf544119efa4a64223b649750a510f0d463f', 'xxxxx'],
  ['018f4d7f06cb8626e1756452581373e05ae41c56', 'xxxxxx'],
  ['2db6d21d365f544f7ca3bcfb443ac96898a7a069', 'xxxxxxx'],
  ['bcf22dfc6fb76b7366b1f1675baf2332a0e6a7ce', 'xxxxxxxx'],
  ['70374248fd7129088fef42b8f568443f6dce3a48', 'xxxxxxxxx'],
  ['ff9ee043d85595eb255c05dfe32ece02a53efbb2', 'xxxxxxxxxx'],
  ['c2b6ff6ac90ae4c7ba8118bf82133b587f6844d0', 'xxxxxxxxxxx'],
  ['49901d945ad6da0f0af47691f305daf994d9d2c9', 'xxxxxxxxxxxx'],
  ['35bf59a8608e6056fee877d137c05081fc98eb11', 'xxxxxxxxxxxxx'],
  ['33da8d0e8af2efc260f01d8e5edfcc5c5aba44ad', 'xxxxxxxxxxxxxx'],
  ['f29546c9b9b5056412af91317f83158a4f5f06d4', 'xxxxxxxxxxxxxxx'],
  ['a7a7c2e911a47b967d34b5a8807c040e9d167815', 'xxxxxxxxxxxxxxxx'],
  ['3f0155e75563ab3adc0505000a86da5baa207d1f', 'xxxxxxxxxxxxxxxxx'],
  ['38e57225a610ee2a597024ae2b31867844938b26', 'xxxxxxxxxxxxxxxxxx'],
  ['dce1f02ca7cc4b63ac43008b7a3ce96e702a0c24', 'xxxxxxxxxxxxxxxxxxx'],
  ['d02e53411e8cb4cd709778f173f7bc9a3455f8ed', 'xxxxxxxxxxxxxxxxxxxx'],
  ['67f47aa04705d775ee067d6db7d3d1196802990f', 'xxxxxxxxxxxxxxxxxxxxx'],
  ['22d980c81eb878c4a7731e77f2633831979d51f6', 'xxxxxxxxxxxxxxxxxxxxxx'],
  ['2acc6756e4aa393274ae109f91c4ecdf5153604d', 'xxxxxxxxxxxxxxxxxxxxxxx'],
  ['f7228ea6b178df32077280927f544cf46831a5e7', 'xxxxxxxxxxxxxxxxxxxxxxxx'],
  ['05711f1306adf20998dbdddbf0962f7eef6325f1', 'xxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['d7b54da3c1ed6623cdaaa638fd7d7fb6099c65fb', 'xxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['6fc065b11399e0d9523527aa593107f9301ec1f5', 'xxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['a99d79c8a2946d7c89c67521a13a917928ca1b58', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['ede3079249cce9fa824a8bb1d95447c6ebcea620', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['5da451e73b2773e53c1d46d6e45fd897838621d1', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['a700b9df6265e0e1a44fef607bf7319f702ed7e9', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['680cb4c5ec5d1bbfa592081dcc915e15b3cd9d3e', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['60bbb3c88636ba22efaea7c521d6f4ca17c62342', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['94f5615ced9f0626ed6f7effcf12bb883632b147', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['a5804110fb8af48579cb1ddc951b802c5dfd82ce', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['b43c42666504175b55714a8404ab1c30b1ab88c8', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['de9fb0ece0aaa283ed2d48399152a1329898848b', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['4dcc4124122dc4a033fbdf28ca174fecb8dc8210', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['931293b3347b83ce52911c47277a612d7d92f99a', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['47372a7b27569d25063df5cbbf7606f615a8ec2a', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['9dc0da3613af850c5a018b0a88a5626fb8888e4e', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['30edcc340339d64cf63263a983283272c5cfc6d2', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['1fb1c5bf6f209b731cab1656dc2c1901ac3ddca1', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['0b8bb2499ed501bb7fd61ffc4192c829242209d1', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['fbddf2383576fd1e5a416f44852fb66b26771e09', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['65b044cc017d6d9499628d20bde3d6f2b30aff3d', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['f89d4936f190d205f17b588e0d61dc9e085fade6', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['9ba3571eafaf6619487a5b53a2e98096669dbfc9', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['79bede281ed797b1b8ec4ddd20ca5456d6e59b3a', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['c3f0ee5d874bc080fa3b88bfb21d3cc888365bd0', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['c83a7fbb4caf846b22c9fcf132f0f16603f46de4', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['e79c680685886f80ab385a40ff182baf1c28c1a9', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['477598ced08c849d7d894afcf48e9c2ad2b3842d', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['31045e7bb077ff8d188a776b196b980388735dbb', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['cef734ba81a024479e09eb5a75b6ddae62e6abf1', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['901305367c259952f4e7af8323f480d59f81335b', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['025ecbd5d70f8fb3c5457cd96bab13fda305dc59', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['1fc8ec1c521db349501a72ad396e44bfade318c2', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['af3526de3ee728ffd84f7381df8c29b09e3a088d', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['06ced2e070e58c2c4ed9f2b8cb890f0c512ce60d', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['5482c87d17cc9f29b9f5580d168a712708b8ea98', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['ff5b5136336035a9f58c21d5da1e2a1d29c67943', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['0ddc4e0cccd9a12850deb5abb0853a4425559fec', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
  ['bb2fa3ee7afb9f54c6dfb5d021f14b1ffe40c163', 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],

];

var TEST_MD5 = [
  ['d41d8cd98f00b204e9800998ecf8427e', ''],
  ['900150983cd24fb0d6963f7d28e17f72', 'abc'],
  ['f96b697d7cb7938d525a2f31aaf161d0', 'message digest'],
  ['adedf9c887371dfab2e16335685b0645', 'secure hash algorithm'],
  ['9121d2e3f26e0b7fd54d58bd430498c7', 'SHA256 is considered to be safe'],
  ['8215ef0796a20bcaaae116d3876c664a', 'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq'],
  ['b02752d13a05fa8d7d04aabd158ff9d1', 'For this sample, this 63-byte string will be used as input data'],
  ['debcb70bf9c8e83659ef1d85aa51c5e9', 'This is exactly 64 bytes long, not counting the terminating byte'],
  ['dbebdf85e436ea73425415982867015c', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae cras amet.']
];

function run_tests(name, TEST_VECTORS, func) {
  var expected, result, message, i, n = TEST_VECTORS.length;
  for (i = 0; i < n; ++i) {
    expected = TEST_VECTORS[i][0];
    message  = TEST_VECTORS[i][1];
    result   = func(message);
    result = name + (result === expected ? 'PASS ' : 'FAIL ') + result + ' ' + message.length;
    console.log(result);
  }
}

run_tests('sha256 ', TEST_SHA256, sha256);
run_tests('sha1   ', TEST_SHA1, sha1);
run_tests('md5    ', TEST_MD5, md5);
