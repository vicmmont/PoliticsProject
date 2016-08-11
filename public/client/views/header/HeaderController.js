(function(){
	angular
		.module("MyPoliticsApp")
		.controller("HeaderController", headerController);

	function headerController($location) {
		var vm = this;
		vm.$location = $location;
	}
})();