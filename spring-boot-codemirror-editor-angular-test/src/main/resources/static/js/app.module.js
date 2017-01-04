(function() {
	'use strict';

	startup.$inject = [ '$log' ];

	angular.module("editorMD", [ 'ngResource', 'ngAnimate', 'ngMaterial' ]).run(
			startup);

	function startup($log) {
		$log.debug('[editorMD] Startup App...');

	}

})();