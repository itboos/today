// http://javascript.info/promise-api

// Promise.allSettled waits for all promises to settle. The resulting array has:

// { status:"fulfilled", value:result} for successful responses,
// { status:"rejected", reason:error } for errors.

// Promise.allSettled
if(!Promise.allSettled) {
  Promise.allSettled = function(promises) {
    return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
      state: 'fulfilled',
      value
    }), reason => ({
      state: 'rejected',
      reason
    }))));
  };
}