(function() {
	'use strict';

	angular.module('acompMD').controller('PTHorariosTransmissaoDlgCT', PTHorariosTransmissaoDlgCT);

	PTHorariosTransmissaoDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'SidenavSV' ];

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
	function PTHorariosTransmissaoDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, SidenavSV) {
		$log.debug('[PTHorariosTransmissaoDlgCT] Inicializando Controller... SidenaveSV.context: ' + JSON.stringify(SidenavSV.getContext().pt));
		var self = this;

		self.hide = hide;
		
		self.pontoInfoModel = SidenavSV.getContext().pt;
		
		function hide() {
			$mdDialog.hide();
		}
	}
})();