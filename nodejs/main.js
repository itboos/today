
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = new Buffer(bin.length);
bin.copy(sub);
sub[0] = 0x69;
console.log(sub);
console.log(bin);