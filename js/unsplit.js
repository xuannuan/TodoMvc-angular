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
	m.controller('main', [
		'$scope','$location','$routeParams','$route','myservice',
		 function($scope,$location,$routeParams,$route,myservice){
		 		$scope.text="";

				$scope.todos=[
				{id:1,text:"study",completed:true,flag:true},
				{id:2,text:"story",completed:true,flag:true},
				{id:3,text:"sleep",completed:false,flag:true}
				];


		$scope.enter=function(){
			//参数校验属于页面逻辑
			if($scope.text){
				$scope.todos.push({
					
					id:getId(),
					//id:$scope.todos.length+1,//这样设置不好,可能会重复id
					// 比如删除第二个，再添加一个则id即为3。重复
					text:$scope.text,
					completed:false,
					flag:true
				});
				$scope.text="";
			}
		};
		function getId(){
			var id=Math.random();
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					id=getId();//递归避免重复id
					break;
				}
			}
			return id;
		}

		$scope.delete=function(id){
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id===id){
					$scope.todos.splice(i,1);//删除第i个，只删除一个，
					break;
				}
			}
		}
		// 是否有完成的任务
		$scope.show=function(){
			// 一定要有返回值
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed){
					return true;
				}
			}
			return false;
		}

		$scope.clear=function(){
			var c=[];
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].completed===false){
					c.push($scope.todos[i]);
					//$scope.todos.splice(i,1);//不可以这样，因为删除一个后数组长度发生变化
				}
			}
			$scope.todos=c;
		};

		// 状态筛选方法一：

		// $scope.all=function(){
		// 	for(var i=0;i<$scope.todos.length;i++){
		// 		$scope.todos[i].flag=true;
		// 	}
		// };

		// $scope.active=function(){
		// 	for(var i=0;i<$scope.todos.length;i++){
		// 		if($scope.todos[i].completed){
		// 			$scope.todos[i].flag=false;
		// 		}else{
		// 			$scope.todos[i].flag=true;
		// 		}
		// 	}
		// };
		// $scope.completed=function(){
		// 	for(var i=0;i<$scope.todos.length;i++){
		// 		if(!$scope.todos[i].completed){
		// 			$scope.todos[i].flag=false;
		// 		}else{
		// 			$scope.todos[i].flag=true;
		// 		}
		// 	}
		// };

		// 方法二
		
		$scope.selector={};// 过滤的值
		$scope.$location=$location;
		//监视锚点值变化，监视得值要是angular的值
		$scope.$watch('$location.hash()',function(now,old){
			// console.log($location)
			console.log(now);
			// 拿到锚点值
			switch(now){
				case '/active':
					$scope.selector={completed:false};
					break;
				case '/completed':
					$scope.selector={completed:true};
					break;
				default:
					$scope.selector={};//显示全部，什么都不过滤
					break;
			}
		});

		// 方法三，路由来获取url里面的锚点值
		// $scope.selector={};//过滤的值,可取{templated:true}、{templated:false}、{}
		// var status=$routeParams.status;//路由中匹配出来的url参数值,此时不需要/
		// console.log(status);
		// switch(status){
		// 	case 'active':
		// 			$scope.selector={completed:false};
		// 			break;
		// 	case 'completed':
		// 			$scope.selector={completed:true};
		// 			break;
		// 	default:
		// 			$route.updateParams({status:''});//把其他莫名奇妙的参数转为空
		// 			$scope.selector={};//显示全部，什么都不过滤
		// 			break;
		// }




		$scope.currentedit=-1;
		$scope.edit=function(id){
			$scope.currentedit=id;
		}
		$scope.save=function(){
			$scope.currentedit=-1;
		}


		// $scope.checkall=false;
		// $scope.$watch('checkall',function(now,old){
		// 	for(var i=0;i<$scope.todos.length;i++){
		// 		$scope.todos[i].completed=now;
		// 	}
		// });

		// 或者
		var now=true;
		$scope.toggleAll=function(){
			for(var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].completed=now;
			}
			now=!now;
		};


	}]);


})(angular);
