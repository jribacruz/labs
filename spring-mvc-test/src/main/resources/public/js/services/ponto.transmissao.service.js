(function() {
	'use strict';

	angular.module("acompMD").factory('PontoTransmissaoSV', PontoTransmissaoSV);

	PontoTransmissaoSV.$inject = [ 'AcompCtx', '$log', '$cookies' ,'$resource'];

	/**
	 * 
	 * (AcompInfoService.java)
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @returns
	 */
	function PontoTransmissaoSV(AcompCtx, $log, $cookies, $resource) {
		$log.debug('[PontoTransmissaoSV] Inicializando... ');

		
		var api = {
				historicoconexao : {
					method : 'GET',
					url : AcompCtx.URL_ROOT + '/services/pontos/:id/historicoconexao',
					isArray : true,
					params : {
						t : $cookies.get('t')
					}
				}	
			};
		
				
		var resource = $resource(AcompCtx.URL_ROOT + '/services/pontos/:id', {
			id : '@id'
		}, api);

		var service = {
			resource : resource
		}

		return service;

	}

})();