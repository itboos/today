var zdl ={
  name: 'ZDL',
  age: 23,
  sex: 'man'
};
var zdl2 ={
  name: 'ZDL2',
  age: 23,
  sex: 'man'
};
var zdl3 ={
  name: 'ZDL3',
  age: 23,
  sex: 'man'
};
export default zdl;

export function sayHi() {
  console.log('hi, React.....');
}

export function area(radius) {
  return Math.PI * radius * radius;
}

export function circumference(radius) {
  return 2 * Math.PI * radius;
}
export {
  zdl2,
  zdl3
}