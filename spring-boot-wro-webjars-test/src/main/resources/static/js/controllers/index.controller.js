(function() {
	'use strict';

	angular.module('springMVCMD').controller('IndexCT', IndexCT);

	IndexCT.$inject = [ '$scope', '$log', 'IndexSV' ];

	/**
	 * Controller responsável por gerenciar a tela inicial do acompanhamento.
	 * 
	 * @param $scope
	 * @param $log
	 * @param AcompCtx
	 * @param HighchartSV
	 * @param AcompInfoSV
	 * @returns
	 */
	function IndexCT($scope, $log, IndexSV) {
		$log.debug('[IndexCT] Inicializando Controller...');
		var self = this;
		
		self.foos = IndexSV.resource.query();
		
		
		
	}
})();