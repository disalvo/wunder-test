angular.module('app', [])

.controller('AppCtrl', function AppCtrl ($scope) {

	var vm = this;

	//Model
	vm.currentStep = 1;
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
	];
	vm.user = {};

	//Functions
	vm.gotoStep = function(newStep) {
		vm.currentStep = newStep;
	}

	vm.getStepTemplate = function(){
		for (var i = 0; i < vm.steps.length; i++) {
			if (vm.currentStep == vm.steps[i].step) {
				return vm.steps[i].template;
			}
		}
	}

	vm.save = function() {
		console.log(vm.user);
	}

});