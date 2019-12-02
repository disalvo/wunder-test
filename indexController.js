angular.module('app')

.controller('IndexController', function AppCtrl ($scope, $window, UserService, toaster, $timeout) {

	let vm = this;

	vm.steps = [
		{
			step: 1,
			name: "Personal information",
			template: "personal-info.html"
		},
		{
			step: 2,
			name: "Address information",
			template: "address-info.html"
		},
		{
			step: 3,
			name: "Payment information",
			template: "payment-info.html"
		},
		{
			step: 4,
			name: "Success Page",
			template: "success-page.html"
		},
	];
	vm.paymentDataId = null;

	vm.init = function () {
		vm.currentStep = ($window.localStorage.getItem('actualStep') !== null)
			? $window.localStorage.getItem('actualStep')
			: 1;

		vm.user = ($window.localStorage.getItem('userData') !== null)
			? JSON.parse($window.localStorage.getItem('userData'))
			: {};


		if($window.localStorage.getItem('actualStep') !== null) {
			$timeout(() => {
				toaster.success('Hi!', `Welcome back ${vm.user.firstname}.`);
			});
		}
	};

	vm.gotoStep = function(newStep) {
		$window.localStorage.setItem('actualStep', newStep);
		$window.localStorage.setItem('userData', JSON.stringify(vm.user));

		vm.currentStep = newStep;
	};

	vm.getStepTemplate = function(){
		for (var i = 0; i < vm.steps.length; i++) {
			if (vm.currentStep == vm.steps[i].step) {
				return vm.steps[i].template;
			}
		}
	};

	vm.save = () => {
		UserService.Register(vm.user).then(
			(r) => {
				vm.paymentDataId = r.paymentDataId;
				vm.gotoStep(4);
				vm.user = {};
				$window.localStorage.removeItem('actualStep');
				$window.localStorage.removeItem('userData');
			},
			(r) => {
				toaster.error('Error!', 'Something went wrong, please try again.');
			});
	};

	vm.init();

});