$(document).ready(function(){
    $("a[data-name=url]").click(function(){setNav(this);setClass(this);});
    $("ul.sub-menu").click(function(){	
	if($(this).attr("href")=="javascript:;"){
		return false;
	}
    });
    $("a").bind("focus",function() {
           if(this.blur) {this.blur()};
    });
});

//设定导航标题
function setNav(obj){
    var title2 = $("#nav").find("span:last");
	var firstName=$(obj).parent('li').parent('ul').parent('li').find('span.title').html();
	var secondName=$(obj).html();
	var newName=firstName+"<b>&raquo;</b>"+secondName;
	$(title2).html(newName);
}
//修改样式
function setClass(obj){
	$('.page-sidebar.nav-collapse.collapse').find('li').removeClass();
	$(obj).parent('li').removeClass().addClass('active');
	$(obj).parent('li').parent('ul').parent('li').siblings('li').removeClass();
	$(obj).parent('li').parent('ul').parent('li').removeClass().addClass('start active');
	$(obj).parent('li').parent('ul').parent('li').siblings('li').find('ul').hide();
	$('.page-sidebar.nav-collapse.collapse').find('li').find('span.selected').remove();
	$(obj).parent('li').parent('ul').parent('li').siblings('li').find('span.arrow').removeClass('open');
	$(obj).parent('li').parent('ul').parent('li').find('a').eq(0).append('<span class="selected"></span>');
}