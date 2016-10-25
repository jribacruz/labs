(function() {
	'use strict';

	angular.module('acompMD').controller('HorariosTransmissaoDlgCT', HorariosTransmissaoDlgCT);

	HorariosTransmissaoDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'data' ];

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
	function HorariosTransmissaoDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, data) {
		$log.debug('[HorariosTransmissaoDlgCT] Inicializando Controller... HorariosTransmissaoDlgCT.data: ' + JSON.stringify(data));
		var self = this;

		self.hide = hide;
		
		self.zonaInfo = data.zonaInfo;
		
		function hide() {
			$mdDialog.hide();
		}
	}
})();