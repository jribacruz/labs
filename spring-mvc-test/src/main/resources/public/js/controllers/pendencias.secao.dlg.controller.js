(function() {
	'use strict';

	angular.module('acompMD').controller('PendenciasSecaoDlgCT', PendenciasSecaoDlgCT);

	PendenciasSecaoDlgCT.$inject = [ '$scope', '$log', 'AcompCtx', 'HighchartSV', 'AcompInfoSV', '$cookies', '$mdDialog', 'SecaoSV' ];

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
	function PendenciasSecaoDlgCT($scope, $log, AcompCtx, HighchartSV, AcompInfoSV, $cookies, $mdDialog, SecaoSV) {
		$log.debug('[PendenciasSecaoDlgCT] Inicializando Controller... PendenciasSecaoDlgCT.context: ' + JSON.stringify(SecaoSV.getContext().se));
		
		var self = this;
		
		self.secaoInfo = SecaoSV.getContext().se;
		
		self.hide = hide;
		
		self.qtdPendenciasSecao = qtdPendenciasSecao;
		
		self.pendenciasSecaoArray = [];
		
		_init();

		function hide() {
			$mdDialog.hide();
		}
		
		function qtdPendenciasSecao() {
			return self.pendenciasSecaoArray.length;
		}
		
		function _init() {
			angular.forEach(self.secaoInfo.pendenciasSecaoInfo, function(secaoInfo, idSecao) {
				self.pendenciasSecaoArray.push(secaoInfo);
			});
			console.log(self.pendenciasSecaoArray);
		}
	}
})();