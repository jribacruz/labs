(function() {
	'use strict';

	angular.module('acompMD').controller('AppCT', AppCT);

	AppCT.$inject = [ '$scope', '$log', 'AcompCtx', '$interval' ];

	/**
	 * 
	 * Controller responsável por gerar o evento de atualização observado por
	 * outros controllers.
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param $interval
	 */
	function AppCT($scope, $log, AcompCtx, $interval) {
		$log.debug('[AppCT] Inicializando Controller...');
		var self = this;

		$interval(_intervalCallback, AcompCtx.UPDATE_INTERVAL);

		function _intervalCallback() {
			$log.debug('[AppCT] Disparando evento de update...');
			$scope.$broadcast(AcompCtx.UPDATE_EVENT_ID);
		}
	}
})();