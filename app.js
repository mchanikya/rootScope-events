(function(){
	'use strict';

	angular.module('RootScopeDemoApp',[])
	.controller('AppOneController',AppOneController)
	.controller('AppTwoController',AppTwoController);

	AppOneController.$inject=['$rootScope'];

	function AppOneController($rootScope){
		var $ctrl=this;
		$ctrl.Name="";

		$ctrl.sendEvent=function(){
			console.log("sendEvent");
			$rootScope.$broadcast('AppOneController.processing',{Name: $ctrl.Name});
		};

	}//endof appOneController


	AppTwoController.$inject=['$rootScope'];
	function AppTwoController($rootScope) {
		var $ctrl=this;
		$ctrl.userName='';

		var cancelListener = $rootScope.$on('AppOneController:processing', function (event, data) {
			console.log("Event: ", event);
			console.log("Data: ", data);

			if (data.Name) {
				$ctrl.userName = "Hello "+data.Name;
			}
			else {
				$ctrl.showSpinner = "Please enter user name!";
			}
		});

		$ctrl.$onDestroy = function () {
			cancelListener();
		};

	}


})();