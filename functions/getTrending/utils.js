exports.to = function(promise) {
  return promise
    .then(result => [null, result])
    .catch(err => {
      console.log(err);
      return [err, null];
    });
};