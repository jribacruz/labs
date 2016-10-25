(function() {
	'use strict';

	angular.module('acompMD').controller('ZonaInfoVisibleCT', ZonaInfoVisibleCT);

	ZonaInfoVisibleCT.$inject = [ '$scope', '$log', 'AcompCtx', 'AcompInfoSV', '$cookies', '$mdDialog', 'data', 'ZonaInfoFilterSV',
			'$mdToast' ];

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
	function ZonaInfoVisibleCT($scope, $log, AcompCtx, AcompInfoSV, $cookies, $mdDialog, data, ZonaInfoFilterSV, $mdToast) {
		$log.debug('[ZonaInfoVisibleCT] Inicializando Controller...');
		var self = this;

		self.visibleZonas = ZonaInfoFilterSV.visibleZonas;

		self.hide = hide;
		
		self.apply = apply;
		
		self.selectAll = ZonaInfoFilterSV.selectAll;
		
		self.toggleAll = toggleAll;

		function hide() {
			$mdDialog.hide();
			$scope.acompInfoCT.calcFilterCounter();
		}
		
		function toggleAll() {
			$log.debug('[ZonaInfoVisibleCT] toggleAll');
			self.selectAll = !self.selectAll;
			//ZonaInfoFilterSV.toggleAll();
			angular.forEach(self.visibleZonas, function(visibleZona, idZona) {
				visibleZona.visible = self.selectAll;
			});
			ZonaInfoFilterSV.selectAll = self.selectAll
			
			//self.visibleZonas = ZonaInfoFilterSV.visibleZonas;
			$scope.acompInfoCT.calcFilterCounter();
		}

		function apply() {
		}
	}
})();