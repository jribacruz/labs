(function() {
	'use strict';

	angular.module("springMVCMD").factory('IndexSV', IndexSV);

	IndexSV.$inject = [ '$log', '$resource' ];

	/**
	 * Service responsável pelo serviço REST da tela inicial do acompanhamento
	 * (AcompInfoService.java)
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @returns
	 */
	function IndexSV($log, $resource) {
		$log.debug('[IndexSV] Inicializando... ');

		var api = {}

		var resource = $resource('http://localhost:8080/foos/:id', {
			id : '@id'
		}, api);

		var service = {
			resource : resource
		}

		return service;
	}

})();