(function() {
	'use strict';

	angular.module('acompMD').controller('HistoricoConexoesDlgCT', HistoricoConexoesDlgCT);

	HistoricoConexoesDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'data',  ];

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
	function HistoricoConexoesDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, data) {
		$log.debug('[HistoricoConexoesDlgCT] Inicializando Controller... HistoricoConexoesDlgCT.data: ' + JSON.stringify(data));
		var self = this;

		self.hide = hide;
		
		self.zonaInfo = data.zonaInfo;
		
		function hide() {
			$mdDialog.hide();
		}
	}
})();