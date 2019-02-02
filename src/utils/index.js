exports.toThousands = function(num) {
  if (typeof num === 'number') {
    num = num.toString();
  }
  let result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
};
