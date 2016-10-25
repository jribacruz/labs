(function() {
	'use strict';

	angular.module("acompMD").factory('LocalVotacaoSV', LocalVotacaoSV);

	LocalVotacaoSV.$inject = [ 'AcompCtx', '$log', '$cookies' ,'$resource'];

	/**
	 * 
	 * (AcompInfoService.java)
	 * 
	 * @param AcompCtx
	 * @param $log
	 * @param $resource
	 * @returns
	 */
	function LocalVotacaoSV(AcompCtx, $log, $cookies, $resource) {
		$log.debug('[LocalVotacaoSV] Inicializando... ');

		
		var api = {
				localvotacao : {
					method : 'GET',
					url : AcompCtx.URL_ROOT + '/services/zonas/:id/localvotacao',
					isArray : false,
					params : {
						t : $cookies.get('t')
					}
				}	
			};
		
				
		var resource = $resource(AcompCtx.URL_ROOT + '/services/zonas/:id', {
			id : '@id'
		}, api);

		var service = {
			resource : resource
		}

		return service;

	}

})();