#!/usr/bin/env node

// Because these functions are nasty and just set their functions without var,
// we can require them like this and they'll magically appear in global scope.
require('./sha256-min');
require('./sha1-min');
require('./md5-min');

// test vectors from http://www.bichlmeier.info/sha256test.html
// ... plus a load more

var VECTORS = [
  '',
  'abc',
  'message digest',
  'secure hash algorithm',
  'SHA256 is considered to be saf',
  'SHA256 is considered to be safe',
  'SHA256 is considered to be safe.',
  'SHA256 is considered to be safe..................',
  'SHA256 is considered to be safe...................',
  'SHA256 is considered to be safe....................',
  'SHA256 is considered to be safe.....................',
  'SHA256 is considered to be safe......................',
  'abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq',
  'For this sample, this 63-byte string will be used as input data',
  'This is exactly 64 bytes long, not counting the terminating byte',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vitae cras amet.',

  // Here are some strings with non-ascii characters in them
  'Q£$%£!"@%$@%^£"!214',
  'Þetta er einhver kaldur íslenskum texta',
  'Online översättningstjänster är mycket användbara',

  // Add any more strings in here if you'd like
];

// Also add strings "xxxx.....xxxx" of length 0..2048
for(var i = 0; i <= 2048; i += 1){
  VECTORS.push(Array(i+1).join('x'));
}

for(var i = 0; i < 22; i += 1){
  VECTORS.push(Array(Math.pow(2, i) + 1).join('x'));
}

var crypto = require('crypto');

function run_tests(name, func) {
  VECTORS.forEach(function(message){

    // use Node's built in crypto as our reference value
    var expected = crypto.createHash(name).update(message, 'utf8').digest('hex');
    var result   = func(message);
    if(result === expected){
      console.log('%s \x1b[32mPASS\x1b[0m %s %s', name, result, message.length);
    }else{
      console.log('%s \x1b[31mFAIL\x1b[0m', name);
      console.log('  Input:    %s', message);
      console.log('  Expected: %s', expected);
      console.log('  Got:      %s', result);
      process.exit(1);
    }
  });
}

run_tests('sha256', sha256);
run_tests('sha1', sha1);
run_tests('md5', md5);

console.log('\x1b[32mAll good!\x1b[0m');
