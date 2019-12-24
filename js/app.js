(function (angular) {
	'use strict';

	/**
	* myapp Module
	1,注册一个主模块
	2，分析结构，input需要一个双向数据绑定，任务列表需要一个数组，每一个li需要id，内容，勾选
	3，给HTML加上相应的数据绑定，应该先给固定数据举例子测试。
	4，绑事件ng-submit，即按enter键加上任务（即给数组添加一行）
	5，绑删除事件，获取该任务的id，然后删除这一行数组，用splice(stat，length，insert)
	6,Clear completed事件,把所有completed为true的数组元素删除,
	先把所有completed为false的数组元素装进一个数组，然后在赋值给任务列表数组，最后删除
	且只有在有勾选的任务时才显示按钮
	7,可编辑状态，判断当前id是否是双击的id,加类名，然后回车取消编辑状态绑定ng-submit事件
	8,全选，只需绑定ng-modle,ng-checked,但是这样任务列表的completed就没有变化,解决
	通过监听model指令，改变completed
	9,对于all，active，completed点击事件只看,
	方法一：任务列表添加一个flag：true元素，用于ng-show
	的绑定，然后对点击事件改变flag值
	方法构思一（bug)：一开始用数组装一组flag值，问题是，对于添加的元素没有在flagarr中自动添加true值，所以会隐藏
	方法二：fliter指令,且不用点击事件，用监视锚点改变就执行不同的过滤
	方法三：依然是filter，但是有路由来执行不同过滤
	*
	* Description
	*/
	//注册模块
	var mymodule=angular.module('myapp',
	 ['ngRoute','mycontrollers.app','services.controllers.app']);

	// 创建路由规则,就不需要$location，但一直不成功
	// mymodule.config(['$routeProvider',function($routeProvider) {
	// 	$routeProvider
	// 	// /active {status:active}
	// 	.when('/:status?',{//在：后面的值是参数
	// 		controller:'main',
	// 		templateUrl:'main_tmpl'
	// 	})
	// 	.otherwise({
	// 		redirectTo:'/'
	// 	})
		
	// }]);


})(angular);
