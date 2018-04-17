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

// use admin
// db.createUser(
//   {
//     user: "root", //用户名
//     pwd: "root123456654321", //密码
//     roles: [ { role: "root", db: "admin" } ] //权限
//   }
// )