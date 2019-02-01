exports.toThousands = function(val) {
  const str = parseFloat(val);
  const reg = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
  return str.replace(reg, '$1,');
};
