console.log('test3...')

const data = {
  a: 1
};

// 依赖收集器
const dep = [];

let Target = null;

function watch (exp, fn) {
    // 将fn赋值给Target
    Target = fn;

     // 如果 exp 是函数，直接执行该函数
     if (typeof exp === 'function') {
      exp()
      return
  }

    // 处理 'a.b.c' 这种 path 类型，循环读取到 嵌套的属性值。
    let obj = data;
    if (/\./.test(exp)) {
        const path = exp.split('.');
        path.forEach(p => obj = obj[p])

        return;
    }


    // 读取属性，触发get函数，收集依赖
    // eslint-disable-next-line no-unused-expressions
    data[exp];
}

function walk () {
  for (let key in data) {
      const dep = [];
      let val = data[key];

      // 如果val是对象，递归调用 walk，将其属性转为访问器属性
      if (Object.prototype.toString.call(val) === '[object Object]') {
        walk(val);
      }
      Object.defineProperty(data, key, {
          set (newVal) {
              if (newVal === val) return;
              val = newVal;
              dep.forEach(fn => fn());
          },
          // eslint-disable-next-line no-loop-func
          get () {
              // Target就是该变量的依赖函数
              dep.push(Target);
              return val;
          }
      })
  }
}

// 对对象的处理

// 