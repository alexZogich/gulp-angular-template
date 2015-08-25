angular
	.module('app')
	.controller('homeController', homeController);

function homeController() {
	var vm = this;

	vm.phrase = "Hello_World!!!";
}

