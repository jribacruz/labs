(function() {
	'use strict';

	angular.module('acompMD').controller('PTHistoricoConexoesDlgCT', PTHistoricoConexoesDlgCT);

	PTHistoricoConexoesDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'SidenavSV', 'PontoTransmissaoSV' ];

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
	function PTHistoricoConexoesDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, SidenavSV, PontoTransmissaoSV) {
		$log.debug('[PTHistoricoConexoesDlgCT] Inicializando Controller... SidenaveSV.context: ' + JSON.stringify(SidenavSV.getContext().pt));
		var self = this;

		self.hide = hide;
		
		self.pontoInfoModel = SidenavSV.getContext().pt;
		
		self.historicoConexoes = PontoTransmissaoSV.resource.historicoconexao({ id: SidenavSV.getContext().pt.idPontoTranmissao });
			
		function hide() {
			$mdDialog.hide();
		}
	}
})();