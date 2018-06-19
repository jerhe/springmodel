
使用：
 	项目导入： layer/layer.js

说明文档：http://layer.layui.com/

例子：
	//信息框-例1
	layer.alert('见到你真的很高兴', {icon: 6});
	 
	//信息框-例2
	layer.msg('你确定你很帅么？', {
	  time: 0 //不自动关闭
	  ,btn: ['必须啊', '丑到爆']
	  ,yes: function(index){
	    layer.close(index);
	    layer.msg('雅蠛蝶 O.o', {
	      icon: 6
	      ,btn: ['嗷','嗷','嗷']
	    });
	  }
	});

	//信息框-例3
	layer.msg('这是最常用的吧');

	//信息框-例4
	layer.msg('不开心。。', {icon: 5});

	//信息框-例5
	layer.msg('玩命卖萌中', function(){

	//关闭后的操作
	});

	//页面层-自定义
	layer.open({
	  type: 1,
	  title: false,
	  closeBtn: 0,
	  shadeClose: true,
	  skin: 'yourclass',
	  content: '自定义HTML内容'
	});

	//页面层-佟丽娅
	layer.open({
	  type: 1,
	  title: false,
	  closeBtn: 0,
	  area: '516px',
	  skin: 'layui-layer-nobg', //没有背景色
	  shadeClose: true,
	  content: $('#tong')
	});

	//iframe层-父子操作
	layer.open({
	  type: 2,
	  area: ['700px', '450px'],
	  fixed: false, //不固定
	  maxmin: true,
	  content: 'test/iframe.html'
	});

	//iframe层-多媒体
	layer.open({
	  type: 2,
	  title: false,
	  area: ['630px', '360px'],
	  shade: 0.8,
	  closeBtn: 0,
	  shadeClose: true,
	  content: '//player.youku.com/embed/XMjY3MzgzODg0'
	});
	layer.msg('点击任意处关闭');

	//iframe层-禁滚动条
	layer.open({
	  type: 2,
	  area: ['360px', '500px'],
	  skin: 'layui-layer-rim', //加上边框
	  content: ['mobile/', 'no']
	});

	//加载层-默认风格
	layer.load();

	//此处演示关闭
	setTimeout(function(){
	  layer.closeAll('loading');
	}, 2000);

	//加载层-风格2
	layer.load(1);

	//此处演示关闭
	setTimeout(function(){
	  layer.closeAll('loading');
	}, 2000);

	//加载层-风格3
	layer.load(2);

	//此处演示关闭
	setTimeout(function(){
	  layer.closeAll('loading');
	}, 2000);

	//加载层-风格4
	layer.msg('加载中', {
	  icon: 16
	  ,shade: 0.01
	});

	//打酱油
	layer.msg('尼玛，打个酱油', {icon: 4});
	//tips层-上

	layer.tips('上', '#id或者.class', {
	  tips: [1, '#0FA6D8'] //还可配置颜色
	});

	//tips层-右
	layer.tips('默认就是向右的', '#id或者.class');

	//tips层-下
	layer.tips('下', '#id或者.class', {
	  tips: 3
	});

	//tips层-左
	layer.tips('左边么么哒', '#id或者.class', {
	  tips: [4, '#78BA32']
	});

	//tips层-不销毁之前的
	layer.tips('不销毁之前的', '#id或者.class', {
	  tipsMore: true
	});

	//默认prompt
	layer.prompt(function(val, index){
	  layer.msg('得到了'+val);
	  layer.close(index);
	});

	//屏蔽浏览器滚动条
	layer.open({
	  content: '浏览器滚动条已锁',
	  scrollbar: false
	});

	//弹出即全屏
	var index = layer.open({
	  type: 2,
	  content: 'http://layim.layui.com',
	  area: ['320px', '195px'],
	  maxmin: true
	});
	layer.full(index);

	//正上方
	layer.msg('灵活运用offset', {
	  offset: 't',
	  anim: 6
	});

	//更多例子 
	layer.msg('Hi');
