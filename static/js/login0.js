(function login(){
    // const fuid = getUrlParam("fuid");
    const fuid = window.location.href;
    console.log(fuid, "<-----fuid");
        if(true){
            $post("/cookie/login",{},{Appid:videoAppid,Fuid:fuid},function(res){
                alert("in")
                if(res.result===1){
                    $.ajax({
                        url: baseUrl+"/get_user_info",
                        type: 'POST',
                        data: JSON.stringify({}),
                        dataType: 'text',
                        contentType: "text/plain",
                        headers: {Appid:videoAppid, Fuid:fuid},
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        success(res) {
                            let obj = jsonlint.parse(res);
                            if(obj.result===1){
                                sessionStorage.setItem("uid",obj.user.uid);
                                sessionStorage.setItem("isLogin", $.cookie("session"));
                                windowBack("分享0","wxShare.html","wxShare.html");
                            }
                        },
                        fail(res) {
                            toError();
                        }
                    });


                }else{
                    toError();
                }
            })
        }else{

        }

    function getUrlParam(type){
        // let regexp = new RegExp('(^|&)'+type+'=([^&]*)(&|$)');
        let result = window.location.search.substr(1)   ;
        console.log(result);
        if(result!=null){
            return encodeURIComponent(result[2]);
        }else{
            return null;
        }
    }

    function toError(){
        alert("服务器错误！")
    }
})();