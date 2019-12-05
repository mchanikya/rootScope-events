(function(){
	'use strict';

	angular.module('RootScopeDemoApp',[])
	.controller('AppOneController',AppOneController)
	.controller('AppTwoController',AppTwoController)
	.controller('SpinnerController', SpinnerController);

	SpinnerController.$inject=['$rootScope'];
	function SpinnerController($rootScope){
		var $ctrl=this;
		$ctrl.show=false;
		var spinnerCancelListener=$rootScope.$on('AppOneController:showSpinner',function (event, data) {
			$ctrl.show=data.showFlag;
		});
		$ctrl.$onDestroy = function () {
			spinnerCancelListener();
		};

	}

	AppOneController.$inject=['$rootScope','$timeout'];
	function AppOneController($rootScope,$timeout){
		var $ctrl=this;
		$ctrl.Name="";

		$ctrl.sendEvent=function(){
			if ($ctrl.Name == "") {
				$rootScope.$broadcast('AppOneController:error',{ Name: "Please Enter Name! " });
			}else{
				$rootScope.$broadcast('AppOneController:processing',{ Name: "Hello "+$ctrl.Name });
				$rootScope.$broadcast('AppOneController:showSpinner',{ showFlag: true });
				$timeout(function() {
					$rootScope.$broadcast('AppOneController:processing',{ Name: "Bye "+$ctrl.Name });
					$rootScope.$broadcast('AppOneController:showSpinner',{ showFlag: false });
				}, 2000);
			}
		};

	}//endof appOneController

	AppTwoController.$inject=['$rootScope'];
	function AppTwoController($rootScope) {
		var $ctrl=this;
		$ctrl.userName='';

		var cancelListener = $rootScope.$on('AppOneController:processing', function (event, data) {
			// console.log("Event: ", event);
			// console.log("Data: ", data);

			$ctrl.userName = data.Name;
		});

		var cancelListenerError = $rootScope.$on('AppOneController:error', function (event, data) {
			// console.log("Event: ", event);
			// console.log("Data: ", data);

			$ctrl.userName = data.Name;
		});

		$ctrl.$onDestroy = function () {
			cancelListener();
			cancelListenerError();
		};

	}

})();