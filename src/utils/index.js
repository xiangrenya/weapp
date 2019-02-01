exports.toThousands = function(val) {
  const str = parseFloat(val).toFixed(2);
  const reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
  return str.replace(reg, '$1,');
};
