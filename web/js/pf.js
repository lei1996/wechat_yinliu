var u = navigator.userAgent;
//var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
if (isiOS) {
    $("#fanhui").css("display", "inline")
}
