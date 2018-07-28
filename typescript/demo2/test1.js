var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["mon"] = 1] = "mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["fri"] = 4] = "fri";
    console.log('Days:', Days);
})(Days || (Days = {}));
;
console.log(Days['Sun'] === 0);
console.log(Days['fri'] === 4);
console.log(Days[0] === 'Sun');
var test = {};
test[test['Sun'] = 0 ] = 'Sun';
console.log('test:',test);
