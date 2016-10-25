(function() {
	'use strict';

	angular.module("acompMD").factory('SecaoSV', SecaoSV);

	SecaoSV.$inject = [ 'AcompCtx', '$log', '$mdSidenav' ];

	/**
	 * Service responsável pelo serviço REST da tela inicial do acompanhamento
	 * (AcompInfoService.java)
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @returns
	 */
	function SecaoSV(AcompCtx, $log, $mdSidenav) {
		$log.debug('[SecaoSV] Inicializando... ');

		var context = {};

		var service = {
			setContext : setContext,
			getContext : getContext
		}

		return service;

		function setContext(_context) {
			context = _context;
		}

		function getContext() {
			return context;
		}

	}

})();