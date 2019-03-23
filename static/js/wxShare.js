function wxShare(){
    var myAddress = "";
    let address = localAddress.city ? localAddress.city : (localAddress.province ? localAddress.province : "深圳市");
    var city = address.replace(/(.*)市/,'$1');
    city = city.replace(/(.*)省/,'$1');
    // 分享入口页
    $post("/proxy/get_proxy",{type:1},{},function(res){
        if(res.result===1){
            myAddress = res.data.address;
            let myLink = myAddress + "/entry.html";//分享的入口页链接
            let imgLink = myAddress + "/images/share.jpg";//分享的图片链接
            $post("/wechat/get_jsticket",{},{},function(res){
                if(res.result===1){
                    wxConfig(res,myLink,imgLink);
                }else{
                    toError();
                }
            });
        }else{
            toError();
        }
    });
    //微信接口配置
    function wxConfig(res,myLink,imgLink){

        let appId = res.appid;
        let timestamp = res.timeStamp;
        let nonceStr = res.nonceStr;
        let signature = res.jsSign;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: ["onMenuShareTimeline","onMenuShareAppMessage","hideMenuItems","showMenuItems"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

		function getUrlParam(type) {
            var reg = new RegExp("(^|&)" + type + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
    }

        var i = 1;
        var uid = getUrlParam("uid");
	var callback = window.atob(getUrlParam("callback"))
		wx.ready(function (){
                            wx.hideMenuItems(
	{menuList: ['menuItem:share:qq', 'menuItem:favorite', 'menuItem:share:QZone','menuItem:openWithSafari']
});
                            wx.onMenuShareAppMessage({
				title: "正在发生的事", // 分享标
				desc: shareDesc, // 分享描述
				link: "http://py.jczcbg.com/default.html", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: "http://py.jczcbg.com/images/share.jpg", // 分享图标
				// type: '', // 分享类型,music、video或link，不填默认为link
				success: function () {
				if(i>=3){
	          			window.location.href= callback + "?isshare=true";
		          	}else{
		          		$('.fenxiang img').attr('src','images/fenxiang'+i+'.png');
						i++;
		          	}
		        }
			});
			wx.error(function(res){
            });
		});
    }
    function toError(){
        alert("服务器错误！")
    }
}


