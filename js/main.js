(function(angular){
	'use strict';
	/**
	* mycontrollerapp Module
	*
	* Description
	*/
	var m=angular.module('mycontrollers.app', []);
	m.controller('main', [
		'$scope','$location','$routeParams','$route','myservice',
		 function($scope,$location,$routeParams,$route,myservice){
		 //这样anguler会自动把我们所需的服务模块拿过来用
		 		$scope.text="";

				$scope.todos=myservice.get();


		$scope.enter=function(){
			//参数校验属于页面逻辑
			if(!$scope.text){
				return;
			}
			myservice.add($scope.text);
				$scope.text="";

		};
		

		$scope.delete=function(id){
			myservice.remove(id);
		}
		// 是否有完成的任务
		$scope.show=function(){
			return myservice.existCompleted();
		}

		$scope.clear=function(){
			var todos=myservice.clear();
			$scope.todos=todos;
			// 由于对象的内存地址问题
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



		//界面逻辑
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
		$scope.toggleAll=function(){
			myservice.toggleAll();
		};


	}]);
})(angular)