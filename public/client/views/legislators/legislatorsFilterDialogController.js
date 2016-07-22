"use strict";

(function() {
    angular
        .module('MyPoliticsApp')
        .controller('LegislatorsFilterDialogController', legislatorsFilterDialogController);

  function legislatorsFilterDialogController($mdDialog, filters) {
      var vm = this;
      vm.filters = filters;

      vm.hide = function() {
        $mdDialog.hide();
      }

      vm.cancel = function() {
        $mdDialog.cancel();
      }

      vm.answer = function(answer) {
        $mdDialog.hide("success!");
      }
  }
})();