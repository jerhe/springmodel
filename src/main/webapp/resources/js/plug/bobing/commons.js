function isIE(){
	if (document.all){
		return true;
	}else{
		return false;
	}
}

function isFireFox(){
	if(navigator.userAgent.indexOf("Firefox")>0){  
        return true;  
	}else{
		return false;
	}
}

function isSafari(){
	if(navigator.userAgent.indexOf("Safari")>0){  
        return true;  
	}else{
		return false;
	}
}

function isCamino(){
	if(navigator.userAgent.indexOf("Camino")>0){  
        return true;  
	}else{
		return false;
	}
}

function isGecko(){
	if(navigator.userAgent.indexOf("Gecko")>0){  
        return true;  
	}else{
		return false;
	}
}

function getArgsFromHref(sHref, sArgName) {
	var args = sHref.split("?");
	var retval = "";
	if (args[0] == sHref) /* 参数为空 */
	{
		return retval; /* 无需做任何处理 */
	}
	var str = args[1];
	args = str.split("&");
	for ( var i = 0; i < args.length; i++) {
		str = args[i];
		var arg = str.split("=");
		if (arg.length <= 1)
			continue;
		if (arg[0] == sArgName)
			retval = arg[1];
	}
	return retval;
}

function onEditFormResize(wigth, height) {
	alert(wigth);
}

function replaceAll(text, olditem, newitem) {
	if (isEmptyStr(text)){
		return "";
	}	
	var reg = new RegExp(olditem, "g"); // 创建正则RegExp对象
	var stringObj = cStr(text); 
	var newstr = stringObj.replace(reg, newitem); 
	return newstr;
}

// 从url 字符串中提取变量的值
function getQueryValue(sorStr, panStr) {
	var vStr = "";
	if (sorStr == null || sorStr == "" || panStr == null || panStr == "")
		return vStr;
	// sorStr = sorStr.toLowerCase();
	panStr += "=";
	var itmp = sorStr.indexOf(panStr);
	if (itmp < 0) {
		return vStr;
	}
	sorStr = sorStr.substr(itmp + panStr.length);
	itmp = sorStr.indexOf("&");
	if (itmp < 0) {
		return sorStr;
	} else {
		sorStr = sorStr.substr(0, itmp);
		return sorStr;
	}
}

// 产生随机整数
function getRandomNum(Min, Max)
{   
	var Range = Max - Min;   
	var Rand = Math.random();   
	return(Min + Math.round(Rand * Range));   
}   

function getRandomNumEx(MAX){
	return getRandomNum(0, MAX);
}

// 在页面底部显示系统信息
//function addSystemLog(msg){
//	var myDate = new Date();
//	var fullMsg = '[' + myDate.toString() + ']&nbsp&nbsp' + msg + '<br>';
//	$("#systemInfo").append(fullMsg);
//}

// 取得当前Grid选中行id
function getGridSelectRowSysId(grid){
	var rows = $('#' + grid).datagrid("getSelections");
	if (rows.length == 0){
		return "";
	}	
	return rows[0].sysId;
}

// 取得当前Grid选中行id（如果没选中提示）
function checkAndGetGridSelectRowSysId(grid){
	var sysId = getGridSelectRowSysId(grid); 
	if (sysId == ""){
		showMessage('未选中行！');
		abort;
	}		
	return sysId;
}

function getRootPath(){
	var strFullPath = window.document.location.href;
	var strPath = window.document.location.pathname;
	var pos = strFullPath.indexOf(strPath);
	var prePath = strFullPath.substring(0,pos);
	//var postPath = strPath.substring(0,strPath.substr(1).indexOf('/')+1);
	return(prePath);
}

function getImgBtn(imgUrl, title, onClick){
	var result = '<img src=' + qStr2(imgUrl) + ' title=' + qStr2(title) + 'style="cursor:pointer" onClick=' + qStr2(onClick) +'>';
		//result += '<a href="#" onClick=' + qStr2(onClick) +'>' + title + '</a>';
	return result;
}

function isNumber(s) {
	var strP = /^\d+$/;
	return strP.test(s);
}

function isPositiveInt(s) {
	var strP = /^[1-9]\d*$/;
	return strP.test(s);
}

function isPositiveIntOrZero(s) {
	var strP = /^([1-9]\d*)|0$/;
	return strP.test(s);
}

/** Check whether string s is empty */
function isEmptyStr(s) {
	return (s === undefined || s === null || s === '' || s == 'undefined'); 
}

function isNullObj(o) {
	return o === undefined || o === null;
}

function loading() {
	loadingByMsg("正在运行，请稍候....");      
}  

function loadingByMsg(msg) {
    $("<div class=\"datagrid-mask\"></div>").css({ display: "block", width: "100%", height: $(window).height() }).appendTo("body");  
    $("<div class=\"datagrid-mask-msg\"></div>").html(msg).appendTo("body").css({ display: "block", left: ($(document.body).outerWidth(true) - 190) / 2, top: ($(window).height() - 45) / 2 });  
}  

function loaded() {  
    $(".datagrid-mask").remove();  
    $(".datagrid-mask-msg").remove();  
}

function registerAjaxCallingAnimation() {
	// starting setting some animation when the ajax starts and completes
	$('body').ajaxStart(function() {
		loading();
	}).ajaxComplete(function() {
		loaded();
	});
}

function decodeHtml(s) {
    return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&")
    	.replace(/&nbsp;/g, " ").replace(/&quot;/g, "\"").replace(/\\/g, "");
}

function mergeString(text1, text2, div){
	if (!isEmptyStr(text1) && !isEmptyStr(text2)){
		return text1 + div + text2; 
	}else{
		return text1 + text2;
	}
}


/**查找字符串中，指定首位分界符之间的字符
 * @param text
 * @param beginDiv 		首分界符号
 * @param endDiv		尾分界符号
 * @param containDiv	返回是否包含分界符号
 */
function getSubText(text, beginDiv, endDiv, containDiv){
	var result = '';
	var begin = false;	
	for ( var i = 0; i < text.length; i++) {
		if (begin && text[i] == endDiv){			
			break; 
		}		
		if (begin){
			result += text[i];
		}				
		if (text[i] == beginDiv){
			begin = true; 
		}		
	}
	if (containDiv){
		result = beginDiv + endDiv;
	}	
	return result; 
} 

function getBrowser() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return "MSIE";
	}
	if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
		return "Firefox";
	}
	if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
		return "Safari";
	}
	if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
		return "Camino";
	}
	if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
		return "Gecko";
	}
	return "others";
}

function newGuid() { 
    var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    var result = (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
    //alert(result+' 长度:' + result.length);  
    return result;
}

function oneOf(item, items){
	for ( var i = 0; i < items.length; i++) {
	 	if (items[i] == item){
	 		return true;
	 	}
	}
	return false;
}

//在两个值的区域之间，取得下一个值
function inc(item){ 	
	if (item.length > 0){
		var c = item.substr(item.length - 1, 1);		
		var left = item.substr(0, item.length - 1); 
		if ((c >= '0' && c <= '8')||(c >= 'A' && c <= 'Y')||(c >= 'a' && c <= 'y')){
			c++;
			return left + c;
		}else if (c == '9'){
			left = inc(left);
			return left + '0';
		}else if (c == 'Z'){
			left = inc(left);
			return left + 'A';
		}else if (c == 'z'){
			left = inc(left);
			return left + 'a';
		}	
	}
}

function urlStTag(url){
	var sysInitTime = getHiddenValue('sysInitTime');
	if (isEmptyStr(sysInitTime)){
		sysInitTime = getRandomNumEx(99999);	
	}
	var stTag = 'st=' + sysInitTime;
	if (url.indexOf(stTag) >= 0){
		return url;
	}
	if (url.indexOf('?') >= 0){
		stTag = '&' + stTag;
	}else{
		stTag = '?' + stTag;
	}
	return url + stTag;	
}

function getDayDiff(date1,date2){
	var str1 = date1.replace(/-/g, "/");
	var str2 = date2.replace(/-/g, "/");
	var strDate1, strDate2, diffDay;
	if (str1 == "") {
		strDate1 = new Date();
	} else {
		strDate1 = new Date(str1);
	}
	if (str2 == "") {
		strDate2 = new Date();
	} else {
		strDate2 = new Date(str2);
	}
	diffDay = Math.abs(Date.parse(strDate1) - Date.parse(strDate2));
	diffDay = diffDay.toFixed(2) / 1000 / 60 / 60 / 24;
	return diffDay;
}
function getNewDate(date,days){
	var nowDate = date.split("-");
	var currDate = new Date(nowDate[0], nowDate[1]-1, nowDate[2]);
	var nDate = Math.abs(currDate) + (days * 24 * 60 * 60 * 1000);
	var newDate = new Date(nDate);
	var year = newDate.getFullYear();
	var month = newDate.getMonth() + 1;
	var day = newDate.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	return year + "-" + month + "-" + day;
}

//判断是否含汉字
function isCN(str){
	var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
	return reg.test(str);
}

function bindEnterEvent(inputId, buttonId){
    $('#'+inputId).bind('keyup',function(sender) {
        if(sender.keyCode === 13) {
            $('#'+buttonId).trigger("click");
        }
    });
}