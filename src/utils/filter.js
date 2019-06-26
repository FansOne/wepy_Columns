/* 
* 参数说明： 
* @param {Number|String} number：要格式化的数字,必传
* @param {String} currencySymbol：千分位符号,选填(默认值'¥')
* @param {Number} decimals：保留几位小数,选填(默认值2)
* @param {String} decPoint：小数点符号,选填(默认值'.')
* @param {String} thousandsSep：千分位符号,选填(默认值'')
* */
var currencyFormat = function (number, currencySymbol, decimals, decPoint, thousandsSep) {
    currencySymbol = currencySymbol || '¥';
    decimals = decimals || 2;
    decPoint = decPoint || '.';
    thousandsSep = thousandsSep || '';
    var regexp = getRegExp('[^0-9+-Ee.]', 'g');
    number = (number + '').replace(regexp, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec)
        return '' + (Math.ceil((n * k).toFixed(prec)) / k).toFixed(prec)
      };
  
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  
    if (thousandsSep) {
      var reg = getRegExp('(-?\d+)(\d{3})');
      while (reg.test(s[0])) {
        s[0] = s[0].replace(reg, "$1" + thousandsSep + "$2");
      }
    }
  
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      var array = [];
      array.length = prec - s[1].length + 1;
      s[1] += array.join('0');
    }
    return currencySymbol + ' ' + s.join(decPoint);
  }
  
  module.exports = {
    currencyFormat: currencyFormat
  }