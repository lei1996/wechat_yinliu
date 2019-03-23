!function (global,factory) {
    global.NewTxplayer = factory();
}(window,function () {
    return function (obj) {
        var _this = this;
        var start = 0;
        var video = new tvp.VideoInfo();
        video.setVid(obj.vid);
        var pic = video.getVideoSnap();
        // console.log(pic);
        var player =new tvp.Player();
		
		function getUrlParam(type) {
            var reg = new RegExp("(^|&)" + type + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null) return unescape(r[2]); return null; //返回参数值
		}
		
		var isplay = getUrlParam("player")
		if (isplay) {
			obj.story = "ok"
		}
		
        player.create({
            width:'100%',
            height:200,
            video:video,
            modId:obj.modId,
            pic:obj.img !== undefined ? obj.img :pic[2],
            onplaying:function () {
                if(start == 0){
                    start = 1;
                    _this.Playtime();
                }
            },
            onplay:function () {
                if(obj.story == 'no'){
                    video.setHistoryStart(3);
                }else {
                    video.setHistoryStart(obj.currtime);
                }
            },
            onallended:function () {
                _this.playNext();
            }
        });
        _this.Playtime=function(){
            var currtime = setInterval(function () {
                var pt = parseInt(player.getPlaytime());
                if(pt >= obj.currtime && obj.story == 'no'){
                    clearInterval(currtime);
                    _this.PlayStart();
                }
            },1000);
        };
        _this.PlayStart = function () {};
        _this.playNext = function () {};
        _this.player = player;
    }
});
