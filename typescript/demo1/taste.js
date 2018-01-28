// 将 ts 文件编译成js: tsc a.ts  就会在同一个目录里生成 a.js  然后， node a.js 执行即可
function printProfile(profile) {
    console.log('name', profile.name);
    console.log('gender', profile.gender);
    console.log('age', profile.age);
    if (profile.height) {
        console.log('height', profile.height);
    }
}
printProfile({ name: 'GuangWong', gender: 'man', age: 23 });
printProfile({ name: 'GuangWong', age: 23, gender: 'woman', height: 167 });
