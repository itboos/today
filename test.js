'use strict'

let randomDelay = () => new Promise(function(resolve){
    var delay = Math.round(Math.random() * 1000);
    setTimeout(function(){
        console.log('delay ' + delay + ' ms');
        resolve(delay);
    }, delay);
});

async function main(){
    await Promise.all([randomDelay(), randomDelay()]);
    console.log('pass');
    await randomDelay();
}

main();