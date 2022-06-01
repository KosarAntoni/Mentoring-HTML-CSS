// function curry(fn) {
//   return function _cur(...args) {
//     if (args.length > fn.length) throw new Error("Too many args");

//     if (args.length < fn.length) {
//       return function (...args2) {
//         return _cur(...args, ...args2);
//       };
//     }

//     return fn(...args);
//   };
// }

// const _sum = (a, b, c, d) => a + b + c + d;

// const sum = curry(_sum);

const sum = (...args) => {
    const result = args.reduce((acc, n) => acc + n);
    console.log(`Output: ${result}`);
  
    return (...args2) => {
      if (args2.length) return sum(result, ...args2);
    };
  };
  
  sum(2, 3); // 5
  sum(2)(3); // 5
  sum(1)(2)(3)(4); // 10