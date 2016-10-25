(function() {
	'use strict';

	angular.module('acompMD').controller('ZonaInfoFilterCT', ZonaInfoFilterCT);

	ZonaInfoFilterCT.$inject = [ '$scope', '$log', 'AcompCtx', 'AcompInfoSV', '$cookies', '$mdDialog', 'data', 'ZonaInfoFilterSV', '$mdToast' ];

	/**
	 * Controller responsável pela filtragem de zonas da tela principal.
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param HighchartSV
	 * @param AcompInfoSV
	 * @returns
	 */
	function ZonaInfoFilterCT($scope, $log, AcompCtx, AcompInfoSV, $cookies, $mdDialog, data, ZonaInfoFilterSV, $mdToast) {
		$log.debug('[ZonaInfoFilterCT] Inicializando Controller...');
		var self = this;

		self.hide = hide;

		self.group1 = ZonaInfoFilterSV.filterOptions.group1;

		self.apply = apply;

		function hide() {
			$mdDialog.hide();
		}

		function apply() {
			$log.debug('[ZonaInfoFilterCT] grupo1: ' + self.group1);
			//$log.debug('[ZonaInfoFilterCT]  '+$scope.acompInfoCT.filterCounter)
			//console.log($scope);
			$log.debug('[ZonaInfoFilterCT] '+$scope.acompInfoCT.filterCounter);
			$scope.acompInfoCT.filterCounter = 0;
			ZonaInfoFilterSV.filterOptions.group1 = self.group1;
			$scope.acompInfoCT.calcFilterCounter();
			hide();
			_showApplyFeedback();
		}
		
		function _showApplyFeedback() {
			$mdToast.show(
		      $mdToast.simple()
		        .textContent('Filtros de acompanhamento aplicado!')
		        .position('bottom right')
		        .hideDelay(3000)
		    );
		}

	}
})();