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
