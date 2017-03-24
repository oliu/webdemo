$.ajaxSetup({
	contentType:"application/x-www-form-urlencoded;charset=utf-8",   
	complete:function(XMLHttpRequest, textStatus){ 
		var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //通过XMLHttpRequest取得响应头，sessionstatus
		if(sessionstatus=="timeout"){
			alert("登录超时,请重新登录！");
			//如果超时就处理 ，指定要跳转的页面
			window.location.replace(getRootPath() + "/login");
		}
		if(sessionstatus=="noPermission"){
			Messenger().post({
				message: "对不起,当前用户没有该权限,请联系上级主管.",
				type: 'error',
				showCloseButton: true});
		}
	}
});

function redirect(count, url) {
	window.setTimeout(function() {
		count--;
		if (count > 0) {
			redirect(count, url);
		} else {
			window.location.href = url;
		}
	}, 1000);
}

function ajaxGet(url, jump, jumpUrl) {
	$.ajax({
		type: 'get',
		url: url,
		success: function(rs){
			if (rs.ok) {
				Messenger().post(rs.data);
				redirect(jump, jumpUrl);
			} else {
				Messenger().post({
					message: rs.error_msg,
					type: 'error',
					showCloseButton: true});
			}
		},
		error: function(){
			Messenger().post({
				message: "服务器出错,请联系技术人员进行处理.",
				type: 'error',
				showCloseButton: true});
		}
	});
}

function ajaxPost(data, dataType, url, jump, jumpUrl) {
	$.ajax({
		type: 'post',
		url: url,
		data: data,
		dataType: dataType,
		success: function(rs){
			if (rs.ok) {
				Messenger().post(rs.data);
				redirect(jump, jumpUrl);
			} else {
				Messenger().post({
					message: rs.error_msg,
					type: 'error',
					showCloseButton: true});
			}
		},
		error: function(){
			Messenger().post({
				message: "服务器出错,请联系技术人员进行处理.",
				type: 'error',
				showCloseButton: true});
		}
	});
}

var url = window.location.href;
var reg = new RegExp("(\page=){1}(\\d*)");
url = url.replace(reg, "");
function urlISetting(pageName, tab){
	var data = window.location.search;
	var urlI = window.location.href;
	urlI = urlI.split("?")[0];
	var pages=pageName+"=";
	if(data.indexOf("?") != -1) {
		var str = data.substr(1);
		var strs = str.split("&");
		urlI += "?";
		for (var i = 0; i < strs.length; i++) {
			if(strs[i].indexOf(pages) == -1){
				urlI = urlI + strs[i] + "&";
			}
		}
	} else {
		urlI += "?";
	}
	if (tab != null && tab != "") {
		var idx = urlI.indexOf("tab");
		if (idx == -1) {
			urlI = urlI + "&tab=" + tab + "&";
		} else {
			var re = eval('/('+ "tab"+'=)([^&]*)/gi');
			var urlI = urlI.replace(re, 'tab='+tab);
		}
	}
	urlI+=pages;
	return urlI;
}
function addPage(pageBean, pageDOM, pageName, tab) {
    var page = JSON.parse(pageBean);
	var tmpUrl = urlISetting(pageName, tab);
    if (page.currentPage == 1) {
         pageDOM.append('<li><a style="background:none;border:1px solid #eee;color:#999;cursor:default;">上一页</a></li>');
    } else {
         pageDOM.append('<li><a href="' + tmpUrl + (page.currentPage-1) + '">上一页</a></li>');
    }
    if (page.totalPage <= 10) {
         for (var index = 1; index <= page.totalPage; index++) {
              samePage(page, pageDOM, index, page.pageSize,pageName, tab);
         }
    } else {
         if (page.currentPage <= 4) {
              for (var index = 1; index <= 5; index++) {
                   samePage(page, pageDOM, index, page.pageSize, pageName, tab);
              }
              pageDOM.append('<li><a>...</a></li><li><a href="' + tmpUrl + page.totalPage +'">' + page.totalPage + '</a></li>');
              } else if (page.currentPage >= page.totalPage - 3) {
                   pageDOM.append('<li><a href="' + tmpUrl + 1 + '">1</a></li><li><a>...</a></li>');
                   for (var index = page.totalPage - 4; index <= page.totalPage; index++) {
                        samePage(page, pageDOM, index, page.pageSize,pageName, tab);
                   }
              } else { //当前页在中间部分
                   pageDOM.append('<li><a href="' + tmpUrl + 1 + '">1</a></li><li><a>...</a></li>');
                   for (var index = page.currentPage - 2; index <= page.currentPage + 2; index++) {
                        samePage(page, pageDOM, index, page.pageSize,pageName, tab);
                   }
                   pageDOM.append('<li><a>...</a></li><li><a href="' + tmpUrl + page.totalPage +'">' + page.totalPage + '</a></li>');
              }
         }
    if (page.currentPage == page.totalPage) {
         pageDOM.append('<li><a style="background:none;border:1px solid #eee;color:#999;cursor:default;">下一页</a></li>');
    } else {
         pageDOM.append('<li><a href="' + tmpUrl + (page.currentPage+1) + '">下一页</a></li>');
    }
    pageDOM.append('<li><a>共' + page.rowCount + '条记录</a></li>');
}

function samePage(page, pageDOM, index, pageSize, pageName, tab) {
	var tmpUrl = urlISetting(pageName, tab);
    if (page.currentPage == index) {
         pageDOM.append('<li><a style="background:#999;color:#fff;border:1px solid #333;">' + index + '</a></li>');
    } else {
         pageDOM.append('<li><a href="' + tmpUrl + index + '">' + index + '</a></li>');
    }
}

Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};

function getRootPath(){
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
};

//解析存储的emoji表情
function parse(arg) {
    if (typeof ioNull !='undefined') {
        return  ioNull.emoji.parse(arg);    
    }
    return '';
};

function readAsDataURL(imgid, urlImgid) {
	if (typeof FileReader === 'undefined') {
		alert('Your browser does not support FileReader...');
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e) {
		var img = document.getElementById(imgid);
		img.src = this.result;
	}
	reader.readAsDataURL(document.getElementById(urlImgid).files[0]);
};

function makeUrl(url, tab) {
	var newUrl = url;
	if (tab != null && tab != "") {
		var idx = url.indexOf("tab");
		if (idx == -1) {
			newUrl = url + "&tab=" + tab;
		} else {
			var re = eval('/('+ "tab"+'=)([^&]*)/gi');
			var newUrl = url.replace(re, 'tab='+tab);
		}
	}
	return newUrl;
}