(function(angular){
	'use strict';
	/**
	* services.controllers.app Module
	*
	* Description
	*/
	var m=angular.module('services.controllers.app', []);
	m.service('myservice', ['$window',function($window){
		// 默认业务逻辑代码写在服务里面（专门存放业务逻辑（即数据的增删改，eg登陆注册））
		
		var storage=$window.localStorage;//用于本地存储,键值对存储

		//判断键值对的存在，用json格式进行存储
		var todos=storage['my-todo-list']? JSON.parse(storage['my-todo-list']) :[];
		//将变化的数据绑定到本地同步,关闭浏览器下次打开依然在
		function save(){
			storage['my-todo-list']=JSON.stringify(todos);
		}
				// [
				// {id:1,text:"study",completed:true,flag:true},
				// {id:2,text:"story",completed:true,flag:true},
				// {id:3,text:"sleep",completed:false,flag:true}
				// ];

		//需要往外暴露todos数据
		//控制私有字段的访问权限
		this.get=function(){
			return todos;
		}
		//$scope.enter,数据的增加
		this.add=function(tex){
				todos.push({
					id:getId(),
					//id:$scope.todos.length+1,//这样设置不好,可能会重复id
					// 比如删除第二个，再添加一个则id即为3。重复
					text:tex,
					completed:false,
					flag:true
				});
				save();
		};
		function getId(){
			var id=Math.random();
			for(var i=0;i<todos.length;i++){
				if(todos[i].id===id){
					id=getId();//递归避免重复id
					break;
				}
			}
			return id;
		}
		//$scope.delete
		this.remove=function(id){
			for(var i=0;i<todos.length;i++){
				if(todos[i].id===id){
					todos.splice(i,1);//删除第i个，只删除一个，
					break;
				}
			}
			save();
		}
		// 是否有完成的任务$scope.show
		this.existCompleted=function(){
			// 一定要有返回值
			for(var i=0;i<todos.length;i++){
				if(todos[i].completed){
					return true;
				}
			}
			return false;
		}

		//清空已完成$scope.clear
		this.clear=function(){
			var c=[];
			for(var i=0;i<todos.length;i++){
				if(todos[i].completed===false){
					c.push(todos[i]);
					//$scope.todos.splice(i,1);//不可以这样，因为删除一个后数组长度发生变化
				}
			}
			todos=c;
			save();
			//此时将todos指向一个新的地址
			return todos;  
		};

		// $scope.save=function(){
		// 	$scope.currentedit=-1;
		// }
		//更新

		this.updata=function(id,traget){
			save();
		}

		var now=true;
		//$scope.toggleAll
		this.toggleAll=function(){
			for(var i=0;i<todos.length;i++){
				todos[i].completed=now;
			}
			save();
			now=!now;
		};
		
	}])
})(angular)