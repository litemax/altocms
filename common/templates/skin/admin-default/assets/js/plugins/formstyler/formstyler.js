(function(c){c.fn.styler=function(d){d=c.extend({wrapper:"form",idSuffix:"-styler",filePlaceholder:"\u0424\u0430\u0439\u043b \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",fileBrowse:"\u041e\u0431\u0437\u043e\u0440...",selectSearch:!0,selectSearchLimit:10,selectSearchNotFound:"\u0421\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",selectSearchPlaceholder:"\u041f\u043e\u0438\u0441\u043a...",selectVisibleOptions:0,singleSelectzIndex:"100",
selectSmartPositioning:!0,onSelectOpened:function(){},onSelectClosed:function(){},onFormStyled:function(){}},d);return this.each(function(){function s(){var c="",q="",b="",v="";void 0!==a.attr("id")&&""!=a.attr("id")&&(c=' id="'+a.attr("id")+d.idSuffix+'"');void 0!==a.attr("title")&&""!=a.attr("title")&&(q=' title="'+a.attr("title")+'"');void 0!==a.attr("class")&&""!=a.attr("class")&&(b=" "+a.attr("class"));var s=a.data(),g;for(g in s)""!=s[g]&&(v+=" data-"+g+'="'+s[g]+'"');this.id=c+v;this.title=
q;this.classes=b}var a=c(this);a.is(":checkbox")?a.each(function(){if(1>a.parent("div.jq-checkbox").length){var d=function(){var d=new s,b=c("<div"+d.id+' class="jq-checkbox'+d.classes+'"'+d.title+'><div class="jq-checkbox__div"></div></div>');a.css({position:"absolute",zIndex:"-1",opacity:0,margin:0,padding:0}).after(b).prependTo(b);b.attr("unselectable","on").css({"-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-o-user-select":"none","user-select":"none",display:"inline-block",
position:"relative",overflow:"hidden"});a.is(":checked")&&b.addClass("checked");a.is(":disabled")&&b.addClass("disabled");b.click(function(){b.is(".disabled")||(a.is(":checked")?(a.prop("checked",!1),b.removeClass("checked")):(a.prop("checked",!0),b.addClass("checked")),a.change());return!1});a.closest("label").add('label[for="'+a.attr("id")+'"]').click(function(a){b.click();a.preventDefault()});a.change(function(){a.is(":checked")?b.addClass("checked"):b.removeClass("checked")}).keydown(function(a){32==
a.which&&b.click()}).focus(function(){b.is(".disabled")||b.addClass("focused")}).blur(function(){b.removeClass("focused")})};d();a.on("refresh",function(){a.parent().before(a).remove();d()})}}):a.is(":radio")?a.each(function(){if(1>a.parent("div.jq-radio").length){var p=function(){var q=new s,b=c("<div"+q.id+' class="jq-radio'+q.classes+'"'+q.title+'><div class="jq-radio__div"></div></div>');a.css({position:"absolute",zIndex:"-1",opacity:0,margin:0,padding:0}).after(b).prependTo(b);b.attr("unselectable",
"on").css({"-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-o-user-select":"none","user-select":"none",display:"inline-block",position:"relative"});a.is(":checked")&&b.addClass("checked");a.is(":disabled")&&b.addClass("disabled");b.click(function(){b.is(".disabled")||(b.closest(d.wrapper).find('input[name="'+a.attr("name")+'"]').prop("checked",!1).parent().removeClass("checked"),a.prop("checked",!0).parent().addClass("checked"),a.change());return!1});a.closest("label").add('label[for="'+
a.attr("id")+'"]').click(function(a){b.click();a.preventDefault()});a.change(function(){a.parent().addClass("checked")}).focus(function(){b.is(".disabled")||b.addClass("focused")}).blur(function(){b.removeClass("focused")})};p();a.on("refresh",function(){a.parent().before(a).remove();p()})}}):a.is(":file")?a.css({position:"absolute",top:0,right:0,width:"100%",height:"100%",opacity:0,margin:0,padding:0}).each(function(){if(1>a.parent("div.jq-file").length){var p=function(){var q=new s,b=c("<div"+q.id+
' class="jq-file'+q.classes+'"'+q.title+' style="display: inline-block; position: relative; overflow: hidden"></div>'),p=c('<div class="jq-file__name">'+d.filePlaceholder+"</div>").appendTo(b);c('<div class="jq-file__browse">'+d.fileBrowse+"</div>").appendTo(b);a.after(b);b.append(a);a.is(":disabled")&&b.addClass("disabled");a.change(function(){p.text(a.val().replace(/.+[\\\/]/,""));""==a.val()?(p.text(d.filePlaceholder),b.removeClass("changed")):b.addClass("changed")}).focus(function(){b.addClass("focused")}).blur(function(){b.removeClass("focused")}).click(function(){b.removeClass("focused")})};
p();a.on("refresh",function(){a.parent().before(a).remove();p()})}}):a.is("select")?a.each(function(){if(1>a.parent("div.jqselect").length){var p=function(){function q(a){a.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll",function(a){var b=null;"mousewheel"==a.type?b=-1*a.originalEvent.wheelDelta:"DOMMouseScroll"==a.type&&(b=40*a.originalEvent.detail);b&&(a.stopPropagation(),a.preventDefault(),c(this).scrollTop(b+c(this).scrollTop()))})}function b(){i=0;for(len=g.length;i<len;i++){var a=
"",c="",b=a="",d="",h="";g.eq(i).prop("selected")&&(c="selected sel");g.eq(i).is(":disabled")&&(c="disabled");g.eq(i).is(":selected:disabled")&&(c="selected sel disabled");void 0!==g.eq(i).attr("class")&&(b=" "+g.eq(i).attr("class"),h=' data-jqfs-class="'+g.eq(i).attr("class")+'"');var f=g.eq(i).data(),n;for(n in f)""!=f[n]&&(a+=" data-"+n+'="'+f[n]+'"');a="<li"+h+a+' class="'+c+b+'">'+g.eq(i).text()+"</li>";g.eq(i).parent().is("optgroup")&&(void 0!==g.eq(i).parent().attr("class")&&(d=" "+g.eq(i).parent().attr("class")),
a="<li"+h+' class="'+c+b+" option"+d+'">'+g.eq(i).text()+"</li>",g.eq(i).is(":first-child")&&(a='<li class="optgroup'+d+'">'+g.eq(i).parent().attr("label")+"</li>"+a));w+=a}}function p(){var r=new s,e=c("<div"+r.id+' class="jq-selectbox jqselect'+r.classes+'" style="display: inline-block; position: relative; z-index:'+d.singleSelectzIndex+'"><div class="jq-selectbox__select"'+r.title+' style="position: relative"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>');
a.css({margin:0,padding:0}).after(e).prependTo(e);var r=c("div.jq-selectbox__select",e),m=c("div.jq-selectbox__select-text",e),k=g.filter(":selected");k.length?m.html(k.text()):m.html(g.first().text());b();var h="";d.selectSearch&&(h='<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="'+d.selectSearchPlaceholder+'"></div><div class="jq-selectbox__not-found">'+d.selectSearchNotFound+"</div>");var f=c('<div class="jq-selectbox__dropdown" style="position: absolute">'+
h+'<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">'+w+"</ul></div>");e.append(f);var n=c("ul",f),l=c("li",f),t=c("input",f),x=c("div.jq-selectbox__not-found",f).hide();l.length<d.selectSearchLimit&&t.parent().hide();var u=0,A=0;l.each(function(){var a=c(this);a.css({display:"inline-block","white-space":"nowrap"});a.innerWidth()>u&&(u=a.innerWidth(),A=a.width());a.css({display:"block"})});var h=e.clone().appendTo("body").width("auto"),v=h.width();h.remove();v==
e.width()&&(m.width(A),u+=e.find("div.jq-selectbox__trigger").width());u>e.width()&&f.width(u);a.css({position:"absolute",left:0,top:0,width:"100%",height:"100%",opacity:0});var B=e.outerHeight(),z=t.outerHeight(),y=n.css("max-height"),h=l.filter(".selected");1>h.length&&l.first().addClass("selected sel");void 0===l.data("li-height")&&l.data("li-height",l.outerHeight());var C=f.css("top");"auto"==f.css("left")&&f.css({left:0});"auto"==f.css("top")&&f.css({top:B});f.hide();h.length&&(g.first().text()!=
k.text()&&e.addClass("changed"),e.data("jqfs-class",h.data("jqfs-class")),e.addClass(h.data("jqfs-class")));if(a.is(":disabled"))return e.addClass("disabled"),!1;r.click(function(){a.focus();c("div.jq-selectbox").filter(".opened").length&&d.onSelectClosed.call(c("div.jq-selectbox").filter(".opened"));if(!navigator.userAgent.match(/(iPad|iPhone|iPod)/g)){if(d.selectSmartPositioning){var b=c(window),g=e.offset().top,m=b.height()-B-(g-b.scrollTop()),h=d.selectVisibleOptions,k=l.data("li-height"),p=5*
k,r=k*h;0<h&&6>h&&(p=r);0==h&&(r="auto");m>p+z+20?(f.height("auto").css({bottom:"auto",top:C}),h=function(){n.css("max-height",Math.floor((m-20-z)/k)*k)},h(),n.css("max-height",r),"none"!=y&&n.css("max-height",y),m<f.outerHeight()+20&&h()):(f.height("auto").css({top:"auto",bottom:C}),h=function(){n.css("max-height",Math.floor((g-b.scrollTop()-20-z)/k)*k)},h(),n.css("max-height",r),"none"!=y&&n.css("max-height",y),g-b.scrollTop()-20<f.outerHeight()+20&&h())}c("div.jqselect").css({zIndex:d.singleSelectzIndex-
1}).removeClass("opened");e.css({zIndex:d.singleSelectzIndex});f.is(":hidden")?(c("div.jq-selectbox__dropdown:visible").hide(),f.show(),e.addClass("opened focused"),d.onSelectOpened.call(e)):(f.hide(),e.removeClass("opened"),c("div.jq-selectbox").filter(".opened").length&&d.onSelectClosed.call(e));l.filter(".selected").length&&(0!=n.innerHeight()/k%2&&(k/=2),n.scrollTop(n.scrollTop()+l.filter(".selected").position().top-n.innerHeight()/2+k));t.length&&(t.val("").keyup(),x.hide(),t.focus().keyup(function(){var a=
c(this).val();l.each(function(){c(this).html().match(RegExp(".*?"+a+".*?","i"))?c(this).show():c(this).hide()});1>l.filter(":visible").length?x.show():x.hide()}));q(n);return!1}});l.hover(function(){c(this).siblings().removeClass("selected")});var D=l.filter(".selected").text();l.filter(".selected").text();l.filter(":not(.disabled):not(.optgroup)").click(function(){var b=c(this),n=b.text();if(D!=n){var l=b.index();b.is(".option")&&(l-=b.prevAll(".optgroup").length);b.addClass("selected sel").siblings().removeClass("selected sel");
g.prop("selected",!1).eq(l).prop("selected",!0);D=n;m.html(n);e.data("jqfs-class")&&e.removeClass(e.data("jqfs-class"));e.data("jqfs-class",b.data("jqfs-class"));e.addClass(b.data("jqfs-class"));a.change()}t.length&&(t.val("").keyup(),x.hide());f.hide();e.removeClass("opened");d.onSelectClosed.call(e)});f.mouseout(function(){c("li.sel",f).addClass("selected")});a.change(function(){m.html(g.filter(":selected").text());l.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");
g.first().text()!=l.filter(".selected").text()?e.addClass("changed"):e.removeClass("changed")}).focus(function(){e.addClass("focused");c("div.jqselect").removeClass("opened")}).blur(function(){e.removeClass("focused")}).on("keydown keyup",function(b){m.html(g.filter(":selected").text());l.removeClass("selected sel").not(".optgroup").eq(a[0].selectedIndex).addClass("selected sel");38!=b.which&&37!=b.which&&33!=b.which||f.scrollTop(f.scrollTop()+l.filter(".selected").position().top);40!=b.which&&39!=
b.which&&34!=b.which||f.scrollTop(f.scrollTop()+l.filter(".selected").position().top-f.innerHeight()+liHeight);32==b.which&&b.preventDefault();13==b.which&&(b.preventDefault(),f.hide())});c(document).on("click",function(a){c(a.target).parents().hasClass("jq-selectbox")||"OPTION"==a.target.nodeName||(c("div.jq-selectbox").filter(".opened").length&&d.onSelectClosed.call(c("div.jq-selectbox").filter(".opened")),t.length&&t.val("").keyup(),f.hide().find("li.sel").addClass("selected"),e.removeClass("focused opened"))})}
function E(){var d=new s,e=c("<div"+d.id+' class="jq-select-multiple jqselect'+d.classes+'"'+d.title+' style="display: inline-block; position: relative"></div>');a.css({margin:0,padding:0}).after(e);b();e.append("<ul>"+w+"</ul>");var m=c("ul",e).css({position:"relative","overflow-x":"hidden","-webkit-overflow-scrolling":"touch"}),k=c("li",e).attr("unselectable","on").css({"-webkit-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","-o-user-select":"none","user-select":"none","white-space":"nowrap"}),
d=a.attr("size"),h=m.outerHeight(),f=k.outerHeight();void 0!==d&&0<d?m.css({height:f*d}):m.css({height:4*f});h>e.height()&&(m.css("overflowY","scroll"),q(m),k.filter(".selected").length&&m.scrollTop(m.scrollTop()+k.filter(".selected").position().top));a.prependTo(e).css({position:"absolute",left:0,top:0,width:"100%",height:"100%",opacity:0});a.is(":disabled")?(e.addClass("disabled"),g.each(function(){c(this).is(":selected")&&k.eq(c(this).index()).addClass("selected")})):(k.filter(":not(.disabled):not(.optgroup)").click(function(b){a.focus();
e.removeClass("focused");var d=c(this);b.ctrlKey||b.metaKey||d.addClass("selected");b.shiftKey||d.addClass("first");b.ctrlKey||(b.metaKey||b.shiftKey)||d.siblings().removeClass("selected first");if(b.ctrlKey||b.metaKey)d.is(".selected")?d.removeClass("selected first"):d.addClass("selected first"),d.siblings().removeClass("first");if(b.shiftKey){var f=!1,h=!1;d.siblings().removeClass("selected").siblings(".first").addClass("selected");d.prevAll().each(function(){c(this).is(".first")&&(f=!0)});d.nextAll().each(function(){c(this).is(".first")&&
(h=!0)});f&&d.prevAll().each(function(){if(c(this).is(".selected"))return!1;c(this).not(".disabled, .optgroup").addClass("selected")});h&&d.nextAll().each(function(){if(c(this).is(".selected"))return!1;c(this).not(".disabled, .optgroup").addClass("selected")});1==k.filter(".selected").length&&d.addClass("first")}g.prop("selected",!1);k.filter(".selected").each(function(){var a=c(this),b=a.index();a.is(".option")&&(b-=a.prevAll(".optgroup").length);g.eq(b).prop("selected",!0)});a.change()}),g.each(function(a){c(this).data("optionIndex",
a)}),a.change(function(){k.removeClass("selected");var a=[];g.filter(":selected").each(function(){a.push(c(this).data("optionIndex"))});k.not(".optgroup").filter(function(b){return-1<c.inArray(b,a)}).addClass("selected")}).focus(function(){e.addClass("focused")}).blur(function(){e.removeClass("focused")}),h>e.height()&&a.keydown(function(a){38!=a.which&&37!=a.which&&33!=a.which||m.scrollTop(m.scrollTop()+k.filter(".selected").position().top-f);40!=a.which&&39!=a.which&&34!=a.which||m.scrollTop(m.scrollTop()+
k.filter(".selected:last").position().top-m.innerHeight()+2*f)}))}var g=c("option",a),w="";a.is("[multiple]")?E():p()};p();a.on("refresh",function(){a.parent().before(a).remove();p()})}}):a.is(":reset")&&a.click(function(){setTimeout(function(){a.closest(d.wrapper).find("input, select").trigger("refresh")},1)})}).promise().done(function(){d.onFormStyled.call()})}})(jQuery);