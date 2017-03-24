var BOSH_SERVICE = 'http://172.16.0.222:7070/http-bind/';
var domain = "@cmopn.45.com";
//var BOSH_SERVICE = 'http://115.29.189.54:7070/http-bind/';
//var domain = "@cmopn.45.com";
var connection = null;

function onConnect(status) {
	if (status == Strophe.Status.CONNECTING) {
		log("Strophe is connecting");
	} else if (status == Strophe.Status.CONNFALL) {
		log("Strophe failed to connect");
	} else if (status == Strophe.Status.DISCONNECTING) {
		log("Strophe is disconnecting");
	} else if (status == Strophe.Status.DISCONNECTED) {
		log("Strophe is disconnected");
	} else if (status == Strophe.Status.CONNECTED) {
		log("Strophe is connected");
		connection.addHandler(onMessage, null, 'message', null, null, null);
		connection.send($pres().tree());
		Messenger().post("小猜上线成功.");
	}
}

function log(msg) {
	console.log(msg);
}

function onMessage(msg) {
	var to = msg.getAttribute("to");
	var from = msg.getAttribute("from");
	var nick = msg.getAttribute('nick');
	var type = msg.getAttribute("type");
	var elems = msg.getElementsByTagName('body');
	if (type == "chat" && elems.length > 0) {
		var bool = false;
		$('.user_list').find('li').each(function(index) {
			if ($(this).find('input').val() == from.split('@')[0]) {
				bool = true;
				return;
			}
		});
		$.ajax({
			type: "get",
			async: false,
			url: getRootPath() + "/members/getMemberPro?uid=" + from.split('@')[0],
			success: function(rs){
				if (!bool) {
					$('.user_list').append(
							'<li style="background:url('+ rs.url+ ');background-size: 18% 100%;background-repeat:no-repeat;" id="list' + rs.uid+ '">'
							+ '<input type="hidden" value="'+ rs.uid + '">'
							+ '<a id="who' + rs.uid + '" class="toUser" href="javascript:void(0)">'
							+ rs.nick + '</a>' + '<label>' + rs.uid + '</label>' + '</li>');
					$('#list' + rs.uid).bind('click', function() {
						$('#list' + rs.uid).find('a').find('span').remove();
						$('.r_mess.fr').each(function() {
							$(this).hide();
						});
						$('#msgChat' + rs.uid).show();
					});
					$('.m_mess').append(
							'<div id="msgChat'+ rs.uid+ '" class="r_mess fr">'
							+ '<input id="toJid'+ rs.uid+ '" type="hidden">'
							+ '<h2>'
							+ '<button class="closeChat">关闭</button>'
							+ '<span id="toWho'+ rs.uid+ '">'+ rs.nick+ '</span>'
							+ '</h2>'
							+ '<a class="history" href="javascript:void(0)">查看历史记录</a>'
							+ '<ul id="userMsg'+ rs.uid+ '" class="r_usermsg">'
							+ '<li style="background:url('+ rs.url+ ');background-size: 8% 40%;background-repeat:no-repeat;" class="lileft">'
							+ rs.nick
							+ '<br /><p>'+ Strophe.getText(elems[0])+ '</p>(' + new Date().format('MM-dd hh:mm') + ')</li>'+ '</ul>'
							+ '<form id="form'+ rs.uid+ '" action="javascript:void(0)" onsubmit="sendMsg('+ rs.uid+ ');" class="r_foot">'
							+ '<input id="msg-'+ rs.uid+ '" type="text" class="r_txt fl" />'
							+ '<button type="submit" class="r_btn fr">发送</button>'
							+ '<input type="hidden" value="'+ rs.uid + '">'+ '</form>' + '</div>'
					);
					$('#msgChat' + rs.uid).hide();
					$('.closeChat').bind('click', function() {
						$(this).parents('div').eq(0).hide();
					});
				} else {
					$('#userMsg' + rs.uid).append(
							'<li style="background:url('+ rs.url+ ');background-size: 8% 40%;background-repeat:no-repeat;" class="lileft">'
							+ rs.nick+ '<br /><p>'+ Strophe.getText(elems[0])+ '</p>(' + new Date().format('MM-dd hh:mm') + ')</li>');
				}
				if ($('#userMsg'+rs.uid).is(':hidden')) {
					if ($('#list' + rs.uid).find('a').find('span').length <= 0) {
						$('#list' + rs.uid).find('a').append('<span class="badge" style="background-color:#FF0000">new</span>');
					}
				}
			}
		});
	}
	return true;
}

function rawInput(data) {
	log(data);
}

function rawOutput(data) {
	log(data);
}

$(document).ready(function() {
	connection = new Strophe.Connection(BOSH_SERVICE);
	connection.rawInput = rawInput;
	connection.rawOutput = rawOutput;
	// 小猜账号密码是固定的.
	connection.connect("56" + domain, 'cpt0000000056', onConnect);
});

$(window).bind('beforeunload', function() {
	connection.disconnect();
	$.get(getRootPath()+"/setSession");
});

function sendMsg(uid) {
	var liheight = 0;
	if (connection != null) {
		var to = $('#form' + uid).find('input').eq(0).attr('id').split('-')[1];
		var cont = $('#form' + uid).find('input').eq(0).val();
		if (cont != "") {
			var suffix = Strophe.getResourceFromJid(connection.jid);
			var reply = $msg({
				id : connection.getUniqueId(suffix),
				to : to + domain,
				from : connection.jid,
				type : 'chat'
			}).c("body", null, cont);
			connection.send(reply.tree());
			// 发送消息
			$('#form' + uid).parent('div').find('ul').append(
					'<li class="liright">小猜<br /><p>' + cont + '</p>(' + new Date().format('MM-dd hh:mm') + ')</li>');
			$('#form'+uid).parent('div').find('ul').find('li').each(function(index){
				liheight += parseInt($(this).css('height').split('p')[0]);
			});
			$('#form' + uid).parent('div').find('ul').scrollTop(liheight);
		} else {
			Messenger().post({
				message : "请输入要发送的消息.",
				type : 'error',
				showCloseButton : true
			});
		}
	} else {
		Messenger().post({
			message : "发送消息失败,可能是当前连接已过时,请刷新重试.",
			type : 'error',
			showCloseButton : true
		});
	}
	$('#form' + uid).find('input').eq(0).val('');
}